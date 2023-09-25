const Hr = require('../models/HR');
const emp = require('../models/employee')
const Newhire = require('../models/HR_new_hire');
const contactUs=require('../models/contact_us');
const nodemailer = require('nodemailer');
const welcome=require('../mailers/welcome_mailer');
const it= require('../mailers/IT_mailer');
const project= require('../mailers/project_mailer');

module.exports.dashboard= async function(req, res){
    var employees=emp.find({}).sort({'_id':-1}).limit(4);
    var record=[];
    Newhire.estimatedDocumentCount(function(err, result) { record[0]=result});
    Newhire.countDocuments({VerificationStatus:'Upload Again',VerificationStatus:'Pending'},function(err, result) { record[1]=result});
    employees.exec(function(err,data){
        if(err) throw err; 
        if(req.cookies.user_id){
            Hr.findById(req.cookies.user_id, function(err,HR){
                if(HR){
                    return res.render('HR_Dashboard',{
                        title: 'HR Dashboard',
                        users:data,
                        records: record
                        });
                }
            })
        }else{
            req.flash('error','You are not logged in!!!')
            return res.redirect('/HRs/sign-in');
        } 
    });  
}

module.exports.itList = function(req, res){
    var contact=Newhire.find({});
    contact.exec(function(err,data){
        if(err) throw err; 
        return res.render('HR_itList', {
            title: "HR | Employee list",
            records: data
    });
  });
}

module.exports.projectList = function(req, res){
    var contact=Newhire.find({VerificationStatus :'Verified'});
    contact.exec(function(err,data){
        if(err) throw err; 
        return res.render('HR_itList', {
            title: "HR | Employee list",
            records: data
    });
  });
}

module.exports.itMail = function(req, res){
    it.itList(req.body.email);
    req.flash('success','Mail sent to IT Team successfully!!')
    return res.redirect('/HRs/dashboard');

}

module.exports.projectMail = function(req, res){
    project.projectList(req.body.email);
    req.flash('success','Mail sent to Project Team successfully!!')
    return res.redirect('/HRs/dashboard');

}

module.exports.kitStatus = function(req, res){
    var status = Newhire.find({});
    status.exec(function(err,data){
        if(err) throw err;
    return res.render('HR_kit', {
        title: " Kit Status",
        records: data
    })
});
}

module.exports.update = async function(req, res){
    var hire=Newhire.find({});
    var Emp = emp.find({});
    emp.findOneAndUpdate({empId:req.params.employee_id},{kitStatus:'Issued'},function(err,doc){
        if(err){console.log(err);}
        doc.save(function(err,res1){
            if(err) throw err; 
            Emp.exec(function(err,data){
                if(err) throw err;
            }); 
        });
    });
    Newhire.findOneAndUpdate({employee_id:req.params.employee_id},{kitStatus:'Issued'},function(err,doc){
        if(err){console.log(err);}
        doc.save(function(err,res1){
            if(err) throw err; 
            hire.exec(function(err,data){
                if(err) throw err; 
                return res.render('HR_kit', {
                    title: "Kit Status",
                    records:data
                });
            }); 
            req.flash('success','Status Updated Successfully');
        });
    });
}

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        Hr.findById(req.cookies.user_id, function(err,HR){
            if(HR){
              return res.render('HR_profile', {
                title: "HR | Profile",
                HR:HR
                }) 
            }
        })
    }else{
        return res.redirect('/HRs/sign-in');
    }  
}

module.exports.queries = function(req, res){
    var contact=contactUs.find({});
    contact.exec(function(err,data){
        if(err) throw err; 
        return res.render('HR_queries', {
            title: "HR | Queries",
            records:data
    });
    
  });
}

module.exports.empDetails = function(req, res){
    var emp=Newhire.find({});
    emp.exec(function(err,data){
        if(err) throw err; 
    return res.render('HR_emp', {
        title: "HR | Employee Details",
        records:data
    });
});
}

module.exports.new_hire = function(req, res){
    return res.render('HR_new_hire', {
        title: "HR | New Hire"
  });
}
module.exports.doc_verify = function(req, res){
    var emp=Newhire.find({});
    emp.exec(function(err,data){
        if(err) throw err;
     
    return res.render('HR_doc_verify', {
        title: "HR | Document Verification",
        records:data
        })
    })
}

module.exports.verified = async function(req, res){
    var verify=Newhire.find({});
    Newhire.findOneAndUpdate({employee_id:req.params.employee_id},
        {VerificationStatus:req.body.Verification_Status,Comments:req.body.Comment},
        function(err,doc){
            if(err){console.log(err);}
            doc.save(function(err,res1){
                if(err) throw err; 
                verify.exec(function(err,data){
                    if(err) throw err; 
                    return res.render('HR_doc_verify', {
                        title: "HR | Document Verification",
                        records:data
                    });
                }); 
                req.flash('success','Employee Verified Successfully');
            });
        });
}


module.exports.verify_action = function(req, res){
    return res.render('HR_verify_action', {
        title: "HR | Verification"
    })
}

module.exports.hired = async function(req, res){

        var hireDetails= new Newhire({
            employee_id:req.body.employee_id,  
            name:req.body.name,
            position:req.body.position,
            email:req.body.email,
            Mobile_no:req.body.Mobile_no,
            joining_date:req.body.joining_date,
            department:req.body.department,
         });
         //conDetails.save();
         hireDetails.save(function(err,res1){
            if(err){
                req.flash('error','Employee with this Email ID already exists')
                throw err; 
                
            }           
        });        
        req.flash('success','Employee added and welcome mail sent successfully!!')
        welcome.welcomeMail(req.body.email,req.body.employee_id);
        return res.redirect('/HRs/new_hire');
}
// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('HR_sign_up', {
        title: " Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('HR_sign_in', {
        title: "Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error','Password and confirm password does not match!!!')
        return res.redirect('back');
    }
    Hr.findOne({email: req.body.email}, function(err, HR){
        if(err){console.log('error in finding HR in signing up'); return}
        if (!HR){
            Hr.create(req.body, function(err, HR){
                if(err){console.log('error in creating HR while signing up'); return}
                return res.redirect('/HRs/sign-in');
            })
        }else{
            req.flash('error','Employee with this email already exists!!!')
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    //find the user
    Hr.findOne({email: req.body.email},function(err, HR){
        if(err){req.flash('error','Invalid Username/Password!!!'); return}
        //handle user found
        if(HR){

            //handle password dont match
            if(HR.password!==req.body.password){
                req.flash('error','Invalid Username/Password!!!');
                return res.redirect('back');
            }
            //handle session create
            res.cookie('user_id',HR.id);
            req.flash('success','Logged In successfully!!!');
            return res.redirect('/HRs/dashboard');
        }else{
            //handle user not found
            req.flash('error','User does not exists!!!');
            return res.redirect('back');
        }
    })
}

module.exports.destroySession = function(req, res){
    res.cookie('user_id','');
    req.flash('success','You have been logged out Successfully!!');
    return res.redirect('/');
}


