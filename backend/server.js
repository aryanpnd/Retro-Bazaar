require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const { productRoutes } = require('./routes/products');
const { UserRoutes } = require('./routes/users');
// const { AuthRoutes } = require('./routes/auth');
const authRouter = require('./controller/auth/googleAuth/googleAuth');
const cookieParser = require('cookie-parser');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
    .connect("mongodb+srv://mongodbPractice:QU12xqT2OLjqa5BB@cluster0.8sxvwko.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then(() => {
        console.log('Database connected...');
    })
    .catch((err) => {
        console.log('Error while connecting to DB');
    });


app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: mongoose.connection.client.s.url })
}))



app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));


app.get('/', (req, res) => {
    res.render(__dirname+'build.html');
  });
app.get('/loginpage', (req, res) => {
    res.sendFile(__dirname + '/loginPage.html')
})
app.get('/signuppage', (req, res) => {
    res.sendFile(__dirname + '/signupPage.html')
})
// app.use(AuthRoutes)
app.use('/auth/google', authRouter);


app.use('/', (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/loginpage')
    }
    else {
        next()
    }
})


app.use('/api', productRoutes, UserRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
