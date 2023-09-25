
const Emp = require('../models/employee');
const Upload = require('../models/upload_document');
const contactUs = require('../models/contact_us');
const feedBack = require('../models/feedback_form');
const fillForm = require('../models/fillform');
const newHire = require('../models/HR_new_hire');
const rPswrd = require('../mailers/reset_mailer');
const crypto = require('crypto');
var async = require('async');

module.exports.resetPassword = function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        Emp.findOne({ email: req.body.email }, function(err, employee) {
          if (!employee) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/employees/forgot_password');
          }
  
          employee.resetToken = token;
          employee.expireToken = Date.now() + 3600000; // 1 hour
          
          employee.save(function(err) {
            done(err, token, employee);
          });
        });
      },
      function(token, employee, done) {
          rPswrd.resetPassword(employee.email,token);
          req.flash('success',"Email has been sent successfully!!");
          return res.redirect('back');
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/employee/forgot_password');
    });
  }

module.exports.setPassword = function(req, res, next){
    async.waterfall([
        function(done) {
          Emp.findById({  }, function(err, employee) {
            if (!employee) {
              req.flash('error', 'Password reset token is invalid or has expired.');
              return res.redirect('back');
            }
    
            employee.password = req.body.pswrd;
            employee.resetToken = undefined;
            employee.expireToken = undefined;
    
            employee.save(function(err) {
              req.logIn(employee, function(err) {
                done(err, employee);
              });
            });
          });
        },
      ], function(err) {
        res.redirect('/');
      });
}

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        Emp.findById(req.cookies.user_id, function(err,employee){
            fillForm.findOne({empId: employee.empId}, function(err, data){
                if(data){
                    return res.render('employee_profile', {
                      title: "Employee | Profile",
                      records: data,
                      emp:employee
                    })  
                }
                else{
                    req.flash('error', 'Fill Form to view profile!!!');
                    return res.redirect('/employees/dashboard');
                }
            })
        })
    }else{
        return res.redirect('/employees/sign-in');
    }
}

module.exports.dashboard= async function(req, res){
    var pp;
    if(req.cookies.user_id){
        Emp.findById(req.cookies.user_id, function(err,employee){
                if(employee){
                    newHire.findOne({employee_id:employee.empId},function(err, data){
                        if(err){console.log(err);}
                        if(data.VerificationStatus == 'Verified'){
                            return res.redirect('/employees/final');
                        }else{
                            return res.render('employee_dashboard', {
                            title: 'Employees Dashboard',
                            records:data
                            })
                        }
                    })
                }
            })
    }else{
        return res.redirect('/employees/sign-in');

    }  
}

module.exports.checkStatus = function(req, res){
    var emp=newHire.find({});
    if(req.cookies.user_id){
        Emp.findById(req.cookies.user_id, function(err,employee){
            newHire.findOne({employee_id:employee.empId},function(err, data){
                if(data.VerificationStatus == 'Verified'){
                    return res.redirect('/employees/final');
                }else{
                    return res.render('employee_status_check', {
                    title: 'Employees Check Status',
                    records:data
                    })
                }
            })
        })
    }else{
        return res.redirect('/employees/sign-in');

    }
}

module.exports.otp = function(req, res){
    return res.render('employee_otp', {
        title: 'Employees OTP Authentication'
    })
}
module.exports.upload = function(req, res){
    return res.render('employee_upload-document', {
        title: 'Employees Document Upload'
    })
}
module.exports.final = function(req, res){
    if(req.cookies.user_id){
        Emp.findById(req.cookies.user_id, function(err, employee){
            newHire.find({employee_id:employee.empId},function(err,doc){
                console.log(doc.VerificationStatus)
                    return res.render('employee_final', {
                        title: "Onboarding completed",
                        records: employee
                    });
                }); 
            });
    }else{
        return res.redirect('/employees/sign-in');
    }
}

module.exports.contact_us = function(req, res){
    return res.render('employee_contact_us',{
        title: 'Contact Us'
    })
}
module.exports.contacted = async function(req, res){
    var contact=contactUs.find({});
         var conDetails= new contactUs({
            Full_Name:req.body.Full_Name,
            Email_ID:req.body.Email_ID,
            Mobile_Number:req.body.Mobile_Number,
            Your_Message:req.body.Your_Message

         });
         //conDetails.save();
         conDetails.save(function(err,res1){
            if(err) throw err; 
            contact.exec(function(err,data){
                if(err) throw err; 
            req.flash('success','Query sent successfully!!!');
            return res.redirect('back');
         });
     });
    
}

module.exports.uploaded = async function(req, res){
 

       Upload.uploadMultiple (req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}
                
                var fileInfo = req.file;

                if (req.file){
                 // this is saving the path of the uploaded file into the avatar field in the user
                    fileInfo.Upload_Photograph = Upload.FilesPath+ '/' + req.file.filename;
                    fileInfo.Upload_Signature = Upload.FilesPath+ '/' + req.file.filename;
                    fileInfo.PAN_Card_Front = Upload.FilesPath+ '/' + req.file.filename;
                    fileInfo.Aadhar_Card_Front = Upload.FilesPath+ '/' + req.file.filename;
                    fileInfo.Aadhar_Card_Back = Upload.FilesPath+ '/' + req.file.filename;
                    fileInfo.Upload_front_page_of_your_Passbook = Upload.FilesPath+ '/' + req.file.filename;
                    fileInfo.Upload_your_pay_slip_from_last_organization = Upload.FilesPath+ '/' + req.file.filename;
             
                }
               
                  req.flash('success','Documents Uploaded successfully');
                  return res.redirect('back');
            });
     
                
    }           


module.exports.fill_form = function(req, res){
    return res.render('employee_fill_form', {
        title: 'Employees Fill Form'
    })
}

module.exports.forgot_password= function(req, res){
   return res.render('employee_forgot_password', {
       title: 'Employees Forgot Password',
       employee: req.employee
    })
}

module.exports.newPassword= function(req, res){
    Emp.findOne({ resetToken: req.params.token, expireToken: { $gt: Date.now() } }, function(err, employee) {
        if (!employee) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/employees/forgot_password');
        }
        res.render('employee_new_password', {
            title: 'Set New Password',
            employee: req.employee        
        });
      });
}

module.exports.feedback_form= function(req, res){
    return res.render('employee_feedback_form', {
        title: 'Employees Feedback Form'
    })
}
module.exports.feedback= async function(req,res){
    var feedbk=feedBack.find({});
        var feedbackDetails= new feedBack({

            Full_Name: req.body.Full_Name,
            Email_ID: req.body.Email_ID,
            feedback1: req.body.feedback1,
            feedback2: req.body.feedback2,
            feedback3: req.body.feedback3,
            feedback4: req.body.feedback4,
            feedback5: req.body.feedback5,
            feedback6: req.body.feedback6,
            feedback7: req.body.feedback7,
            feedback8: req.body.feedback8,
            feedback9: req.body.feedback9,
            feedback10:req.body.feedback10
    });
    feedbackDetails.save(function(err,res1){
        if(err) throw err;
        feedbk.exec(function(err,data){
            if(err) throw err; 
        req.flash('success','Feedback sent Successfully!!');
        return res.redirect('back');
    });
});
}

module.exports.formFilled = async function(req, res){
    var fill=fillForm.find({});
         var fillDetails= new fillForm({

            fname:req.body.fname,
            lname:req.body.lname,
            empId:req.body.empId,
            dob:req.body.dob,
            gender:req.body.gender,
            marital_status:req.body.marital_status,
            nationality:req.body.nationality,
            bloodgrp:req.body.bloodgrp,
            aadhar:req.body.aadhar,
            pan:req.body.pan,
            phone:req.body.phone,
            size:req.body.size,
            awards:req.body.awards,
            line1:req.body.line1,
            line2:req.body.line2,
            pin:req.body.pin,
            city:req.body.city,
            state:req.body.state,
            country:req.body.country,
            family:{
                mother:{
                    Mname:req.body.Mname,
                    Mdob:req.body.Mdob,
                    Mgender:req.body.Mgender,
                    Moccupation:req.body.Moccupation
                },
                father:{
                    Fname:req.body.Fname,
                    Fdob:req.body.Fdob,
                    Fgender:req.body.Fgender,
                    Foccupation:req.body.Foccupation
                },
                spouse:{
                    Sname:req.body.Sname,
                    Sdob:req.body.Sdob,
                    Sgender:req.body.Sgender,
                    Soccupation:req.body.Soccupation
                },
            },
            education:{
                X:{
                    Xyear:req.body.Xyear,
                    Xcollege:req.body.Xcollege,
                    Xboard:req.body.Xboard,
                    Xpercent:req.body.Xpercent
                },
                XII:{
                    XIIyear:req.body.XIIyear,
                    XIIcollege:req.body.XIIcollege,
                    XIIboard:req.body.XIIboard,
                    XIIpercent:req.body.XIIpercent
                },
                Graduation:{
                    Gyear:req.body.Gyear,
                    Gcollege:req.body.Gcollege,
                    Gboard:req.body.Gboard,
                    Gpercent:req.body.Gpercent
                },
                PostGraduation:{
                    PGyear:req.body.PGyear,
                    PGcollege:req.body.PGcollege,
                    PGboard:req.body.PGboard,
                    PGpercent:req.body.PGpercent
                }
            },
            lang1:req.body.lang1,
            read1:req.body.read1,
            write1:req.body.write1,
            speak1:req.body.speak1,
            fluent1:req.body.fluent1,
            lang2:req.body.lang2,
            read2:req.body.read2,
            write2:req.body.write2,
            speak2:req.body.speak2,
            fluent2:req.body.fluent2,
            lang3:req.body.lang3,
            read3:req.body.read3,
            write3:req.body.write3,
            speak3:req.body.speak3,
            fluent3:req.body.fluent3,
            org1:req.body.org1,
            state1:req.body.state1,
            period1:req.body.period1,
            desig1:req.body.desig1,
            rsn1:req.body.rsn1,
            org2:req.body.org2,
            state2:req.body.state2,
            period2:req.body.period2,
            desig2:req.body.desig2,
            rsn2:req.body.rsn2,
            strength:req.body.strength,
            hobbies:req.body.hobbies
         });
         //fillDetails.save();
         fillDetails.save(function(err,res1){
            if(err) throw err; 
            fill.exec(function(err,data){
                if(err) throw err; 
            
            req.flash('success','Form Submitted Successfully!!');
            return res.redirect('/employees/dashboard');
         });
     });
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('employee_sign_up', {
        title: " Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    return res.render('employee_sign_in', {
        title: "Sign In"
    })
}
// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    Emp.findOne({email: req.body.email}, function(err, employee){
        if(err){
            console.log('from  find', err);
            return
        }

        if (!employee){
            Emp.create(req.body, function(err, employee){
                if(err){console.log('Create', err); return}
                req.flash('success','Signed Up Successfully!!');
                return res.redirect('/employees/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res, employee){
    Emp.findOne({email: req.body.email},function(err, employee){
        if(err){console.log('error in finding HR in signing up'); return}
        //handle user found
        if(employee){

            //handle password don't match
            if(employee.password!==req.body.password){
                return res.redirect('back');
            }
            //handle session create
            res.cookie('user_id',employee.id);
            req.flash('success','Logged in successfully');

            return res.redirect('/employees/dashboard');
        }else{
            //handle user not found
            return res.redirect('back');
        }
    })

    
}

module.exports.destroySession = function(req, res){
    res.cookie('user_id','');
    req.flash('success','You have Logged out');
    return res.redirect('/');
}