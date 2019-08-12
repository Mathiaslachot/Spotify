/** @format */

const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('./keys');

const paramToken = {
  token: String,
  refresh: String,
  expires_in: String,
  profile: null,
};
passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotify.clientID,
      clientSecret: keys.spotify.clientSecret,
      callbackURL: 'http://localhost:3000/auth/spotify/callback',
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      paramToken.token = accessToken;
      paramToken.refresh = refreshToken;
      paramToken.expires_in = expires_in;
      paramToken.profile = profile;
      process.nextTick(function() {
        return done(null, profile);
      });
    },
  ),
);
module.exports = {
  paramToken,
};
