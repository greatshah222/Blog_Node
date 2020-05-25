const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router
  .route('/me')
  .get(authController.protect, userController.getMe, userController.getUser);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.route('/').get(authController.protect, userController.getAllUsers);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

// for admin
router
  .route('/:id')
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser)
  .get(authController.protect, userController.getUser);

module.exports = router;
