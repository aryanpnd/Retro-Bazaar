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
                        return done(null, user,{message:'Login Successful'});
                    }
                    else {
                        return done(null, false, { message: "Wrong Email or password" });
                    }

                } else {
                    return done(null, false, { message: "Email already in use" });

                }
            })
            .catch(err => {
                return done(null, false, { message: 'Wrong email' });
            });
    })
);



localAuthRoutes.post("/login", function(req, res, next) {
    try {
        passport.authenticate("local", function(err, user, info) {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          }
          if (!user) {
            return res.status(401).send(info);
          }
          req.logIn(user, function(err) {
            if (err) {
              return res.status(500).json({ message: "Internal server error" });
            }
            return res.status(200).json({ message: "Login successful" });
          });
        })(req, res, next);
    } catch (error) {
        console.log(error)
    }
  });

localAuthRoutes.post('/signup', async (req, res, next) => {
    try {
        const exists = await User.exists({ email: req.body.email });
        if (exists) { res.json({ "message": "User already exists with the provided email address." }) }
        else {

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
                        res.status(200).send('Account created successfully')
                    }).catch((err) => {
                        res.status(400).json(err)
                    })
                })
                .catch((err) => {
                    res.json(err)
                })
        }
    } catch (err) {
        res.status(500).send('Something went wrong from our end')
    }
})

module.exports = { localAuthRoutes }