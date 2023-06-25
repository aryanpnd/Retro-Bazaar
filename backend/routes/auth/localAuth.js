const express = require('express');
const bcrypt = require('bcrypt');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require('../../model/user');
const localAuthRoutes = express.Router()


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local Strategy
passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        User.findOne({ email: email })
            .then(user => {
                if (user.provider === undefined) {

                    const isAuthenticated = bcrypt.compareSync(password, user.password);
                    if (isAuthenticated) {
                        return done(null, user);
                    }
                    else {
                        console.log('hello')

                        return done(null, false, { message: "Wrong password" });
                    }

                } else {
                    console.log('User already exists with a different provider.')
                    return done(null, false, { message: "Email already in use" });

                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);



localAuthRoutes.post("/login",
    passport.authenticate("local", { failureRedirect: '/login', failureMessage: true }), function (req, res) {
        res.status(200).send(req.user)
    });

localAuthRoutes.post('/signup', async (req, res, next) => {
    try {
        await User.findOne({ email: req.body.email })
            .then((user) => {
                const createUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                var hash = bcrypt.hashSync(req.body.password, 10);
                createUser.password = hash
                createUser.save().then((data) => {
                    res.status(200).send('account created successfully')
                }).catch((err) => res.status(400).send(err))
            })
            .catch((err) => {
                res.send(err)
            })
    } catch (err) {
        res.status(500).send('Something went wrong from our end')
    }
})

module.exports = { localAuthRoutes }