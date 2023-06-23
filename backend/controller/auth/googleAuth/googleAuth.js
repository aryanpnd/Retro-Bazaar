const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express');
const googleAuthDal = require('./googleAuth.dal');
const router = express.Router();




let userProfile;
passport.use(
  new GoogleStrategy(
    {
      clientID: "666453716775-6ucd83q73809j34tm7ehc3ssoon4jsu7.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);


router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] }),(req,res)=>{res.send("hello")}
);


router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/loginpage' }),
  async (req, res) => {
    const { failure, success } = await googleAuthDal.registerWithGoogle(userProfile);
  if (failure) console.log('Google user already exist in DB..');
  else console.log('Registering new Google user..');
    res.send("success");
  }
);

router.get('/success', async (req, res) => {
  const { failure, success } = await googleAuthDal.registerWithGoogle(userProfile);
  if (failure) console.log('Google user already exist in DB..');
  else console.log('Registering new Google user..');
  res.render('success', { user: userProfile });
});

router.get('/error', (req, res) => res.send('Error logging in via Google..'));

router.get('/signout', (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.');
    });
    res.render('auth');
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out user' });
  }
});

module.exports = router;
