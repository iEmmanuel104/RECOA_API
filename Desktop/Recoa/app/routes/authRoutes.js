const express = require('express');
const router = express.Router();
const permit = require('../middlewares/permissions');
const {
    registerAdmin,
    verifyAdmin,
    Adminlogin,

} = require('../controller/userController.js');


//user routes
router.post('/register', registerAdmin);
router.post('/verify', verifyAdmin);
router.post('/login', Adminlogin);

module.exports = router;