const {register, login, verifyUser} = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.route('/SignUp').post(register);
router.route('/SignIn').post(login);
router.route('/:id/verify/:veriUrlToken').get(verifyUser);
module.exports = router;