require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
const { productRoutes } = require('./routes/products');
const path = require('path')
// const { UserRoutes } = require('./routes/users');
const googleAuthRouter = require('./routes/auth/googleAuth');
const cookieParser = require('cookie-parser');
const { localAuthRoutes } = require('./routes/auth/localAuth');
const { User } = require('./model/user');
// const { AuthRoutes } = require('./routes/auth/localAuth');



const app = express();
app.use(cors());
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
    saveUninitialized: true,
    cookie: {
        // maxAge: 1000* 60 * 60 *24 * 365 // one year
        maxAge: 60000 // 60000 milliseconds 
    },
    store: new MongoStore({
        mongoUrl: mongoose.connection.client.s.url,
        ttl: 60000 // in seconds
    })
}))

app.use(passport.authenticate('session'));
app.use(passport.session());


app.use(passport.initialize());


app.use('/auth',express.static(path.join(__dirname, 'views/auth/build')))
app.get('/auth/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/auth/build/index.html'))
  })

  

app.use('/authapi/local', localAuthRoutes)
app.use('/authapi/google', googleAuthRouter);


// app.use('/', (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         res.redirect('/auth')
//     }
//     else {
//         next()
//     }
// })



app.get('/', async (req, res) => {
    // await User.findOne({ email: req.session.passport.user.email }).then((data) => {
    //     // console.log(req.session.messages)
    //     res.status(200).json({data:data});
    // }).catch((err) => { res.status(200).send("some error occurred while fetching the data") })
    res.json({"data":{"_id":"6496f649b6142a28aaad9a29","photoURL":"https://lh3.googleusercontent.com/a/AAcHTtc4u0dOJSt4F00vM3dOmWNuguVuiYHgD1fqAy0N=s96-c","accountId":"102623149057499821727","provider":"google","name":"Riya Singh","email":"gamerriyasingh9870@gmail.com","__v":0}})
});

app.use('/api', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
