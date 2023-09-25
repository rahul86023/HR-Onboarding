const express = require('express');
const router = express.Router();
const passport = require('passport');

const employeesController = require('../controllers/employees_controller');

router.get('/dashboard',passport.checkAuthentication,employeesController.dashboard);

router.get('/fill_form', passport.checkAuthentication, employeesController.fill_form); 

router.get('/profile', passport.checkAuthentication, employeesController.profile);

router.get('/upload', passport.checkAuthentication, employeesController.upload);

router.get('/final',passport.checkAuthentication, employeesController.final);

router.get('/check_status',passport.checkAuthentication,employeesController.checkStatus);

router.get('/feedback_form',passport.checkAuthentication, employeesController.feedback_form);

router.get('/sign-up',employeesController.signUp);
router.get('/sign-in',employeesController.signIn);
router.get('/contact_us', employeesController.contact_us);

router.get('/otp', employeesController.otp);
router.get('/forgot_password', employeesController.forgot_password);  
router.get('/newPassword/:token', employeesController.newPassword);  

router.post('/create', employeesController.create);
router.post('/uploaded',employeesController.uploaded);
//router.post('/document2',employeesController.document2);
//router.post('/document3',employeesController.document3);
//router.post('/document4',employeesController.document4);
//router.post('/document5',employeesController.document5);
//router.post('/document6',employeesController.document6);
//router.post('/document7',employeesController.document7);
router.post('/formfilled',employeesController.formFilled);
router.post('/contacted', employeesController.contacted);
router.post('/feedback', employeesController.feedback);
router.post('/resetPassword',employeesController.resetPassword);
router.post('/setPassword/:token',employeesController.setPassword);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/employees/sign-in'},
), employeesController.createSession);

router.get('/sign-out', employeesController.destroySession);


module.exports = router;