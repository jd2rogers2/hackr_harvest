const express = require('express');
const multer  = require('multer');

const { usersController } = require('../controllers');


const upload = multer({ dest: 'uploads/' });
const router = express.Router();


router.post('/signUp', upload.single('file'), usersController.createUser);
router.post('/signIn', usersController.signIn);
// verfiy email?? lambda?!
router.post('/signOut', usersController.signOut);
router.get('/:userId', usersController.getUserById);
router.patch('/:userId', usersController.updateUser);


module.exports = router;
