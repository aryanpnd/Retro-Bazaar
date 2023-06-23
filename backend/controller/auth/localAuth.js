const passport = require('passport');
const { User } = require('../../model/user');
const LocalStrategy = require('passport-local').Strategy;


const strategy = new LocalStrategy(User.authenticate())
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const addUser = async (req, res, next) => {
    User.register(
        new User({
            // firstname: req.body.firstname,
            username:req.body.username,
            email: req.body.email
        }), req.body.password, function (err, msg) {
            if (err) {
                res.send(err);
            } else {
                // res.send({ message: `User registered Successfully with email: ${req.body.email}` });
                passport.authenticate('local')
                res.json({
                    "status":"success",
                    "message":`account has been created successfully with email ${req.body.email}`
                })
            }
        }
    )
}

const login = (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        req.login(user, function (err) {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            return res.status(200).json({ message: 'Login successful' });
        });
    })(req, res, next);
}



module.exports = { addUser, login }