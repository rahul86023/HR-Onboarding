const express = require('express');
const router = express.Router();
const passport = require('passport');


const HRsController = require('../controllers/HRs_controller');


router.get('/dashboard',HRsController.dashboard);
router.get('/sign-up', HRsController.signUp);
router.get('/sign-in', HRsController.signIn);

router.get('/kit-status',HRsController.kitStatus);
router.get('/queries',HRsController.queries);
router.get('/emp-details',HRsController.empDetails);
router.get('/new_hire',HRsController.new_hire);
router.get('/doc_verify',HRsController.doc_verify);
router.get('/verify_action',HRsController.verify_action);
router.get('/itlist',HRsController.itList);
router.get('/projectlist',HRsController.projectList);


router.post('/itMail',HRsController.itMail);
router.post('/projectMail',HRsController.projectMail);
router.post('/hired',HRsController.hired);
router.post('/update/:employee_id',HRsController.update);
router.post('/create', HRsController.create);
router.post('/create-session',HRsController.createSession);
router.post('/verified/:employee_id',HRsController.verified);

router.get('/sign-out', HRsController.destroySession);
module.exports = router;