const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Emp= require('../models/employee');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password,done){
        // find a user and establish the identity
        Emp.findOne({email: email}, function(err, employee)  {
           if (err){
               req.flash('error', err);
               return done(err);
           }
            if (!employee || employee.password != password){
               req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, employee);
        });
    }


));
// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(employee, done){
    done(null, employee.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    Emp.findById(id, function(err, employee){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, employee);
    });
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/employees/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.employee = req.employee;
    }
    next();
}



module.exports = passport;