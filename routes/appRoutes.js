const{deleteDocument, room} = require('../controllers/appController')
const express = require('express')
const router = express.Router();

router.route('/delete').get(deleteDocument);
router.route('/room').get(room);
module.exports = router;