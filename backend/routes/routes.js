const {register, login, verifyUser} = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.route('/signup').post(register);
router.route('/signin').post(login);
router.route('/:id/verify/:veriUrlToken').get(verifyUser);
module.exports = router;