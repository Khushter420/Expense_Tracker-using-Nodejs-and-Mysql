const express = require('express');
const adminController = require('../controller/user_register');
const expanceController = require('../controller/user_expance');
const authentication = require('../middleware/auth');

const router = express.Router();

router.post('/register', adminController.Postuser);
router.post('/login',adminController.Login);

router.post('/addexpense', expanceController.Addexpense);
// router.get('/getexpenses', authentication.authenticate, expanceController.getexpenses );
// router.delete('/deleteexpense/:expenseid', authentication.authenticate, expanceController.deleteexpense);

module.exports = router;