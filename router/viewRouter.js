const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/login', authController.isLoggedIn, viewController.getLogin);
router.get('/signup', authController.isLoggedIn, viewController.getSignup);
router.get('/events', authController.isLoggedIn, viewController.getAllEvent);
router.get(
  '/events/event/:slug',
  authController.isLoggedIn,
  viewController.getEvent
);
module.exports = router;
