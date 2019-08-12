/** @format */

var express = require('express'),
  router = express.Router();
const passport = require('passport');
// auth login

router.get('/login', (req, res) => {
  passport.authenticate('spotify');
  res.render('login');
});

router.get('/logout', (req, res) => {
  passport.authenticate('spotify');
  res.send('logging out');
});

router.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true,
  }),
);

router.get('/spotify/callback', passport.authenticate('spotify'), (req, res) => {
  res.send('salut');
});

module.exports = router;
