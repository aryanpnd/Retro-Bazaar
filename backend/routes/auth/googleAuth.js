const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express');
const { User } = require('../../model/user');
const router = express.Router();

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name, email: user.email });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        User.findById({ _id: user.id }).then(user => {
            cb(null, user);
        });
    });
});


passport.use(
    new GoogleStrategy(
        {
            clientID: "666453716775-6ucd83q73809j34tm7ehc3ssoon4jsu7.apps.googleusercontent.com",
            clientSecret: "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",
            // callbackURL: "http://localhost:8080/authapi/google/callback"
            callbackURL: "https://retro-bazaar.onrender.com/authapi/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            await User.findOne({ email: profile.emails[0].value }).then((user) => {
                if (!user.provider) {
                    
                    return done(null, false, {
                        message: 'User already exists with a different provider.'
                    });
                }
                else {
                    return done(null, user);
                }
            }).catch(async (err) => {
                const user = await new User({
                    photoURL: profile.photos[0].value,
                    accountId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    provider: 'google'
                }).save();

                return done(null, user);
            });

        }
    )
);


router.get(
    '/',
    passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => { res.send("hello") }
);


router.get(
    '/callback',
    passport.authenticate('google', { failureRedirect: '/auth/', successRedirect: '/',failureMessage:true })
);


router.get('/error', (req, res) => res.send('Error logging in via Google..'));

router.get('/signout', (req, res) => {
    try {
        req.session.destroy(function (err) {
        });
        res.send('auth');
    } catch (err) {
        res.status(400).send({ message: 'Failed to sign out user' });
    }
});

module.exports = router;
