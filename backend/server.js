require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const googleAuthRouter = require("./routes/auth/googleAuth");
const cookieParser = require("cookie-parser");
const { localAuthRoutes } = require("./routes/auth/localAuth");
const { User } = require("./model/user");
const { allApiRoutes } = require("./routes/api/allApiRoutes");

// initializing express
const app = express();

// initializing app middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// connection to database
mongoose
  .connect(
    "mongodb+srv://mongodbPractice:QU12xqT2OLjqa5BB@cluster0.8sxvwko.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error while connecting to DB");
  });

// initializing session
app.use(
  session({
    secret: "your secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // maxAge: 1000* 60 * 60 *24 * 365 // one year
      // maxAge: 60000 // 60000 milliseconds or 60 sec
      maxAge: 1000 * 60 * 60 * 24, // one day

      // sameSite: 'none', //required when deploying
      // secure:  true //required when deploying
    },
    store: new MongoStore({
      mongoUrl: mongoose.connection.client.s.url,
      ttl: 60 * 60 * 24, // time to live (in seconds)
    }), // store session on mongodb even if the servers stops , the session will be store there but they get duplicated after every refresh or a request
  })
);

// intializing passport middlewares
// app.enable('trust proxy') // required when deploying
app.use(passport.authenticate("session"));
app.use(passport.session());
app.use(passport.initialize());

// auth pages
app.use("/auth", express.static(path.join(__dirname, "views/auth/build")));
app.get("/auth/*", (req, res) => {
  res.sendFile(path.join(__dirname, "views/auth/build/index.html"));
});

// auth routes and middlewares
app.use("/authapi/local", localAuthRoutes);
app.use("/authapi/google", googleAuthRouter);

// checking if user is authorized
app.use("/", (req, res, next) => {
  req.isAuthenticated() ? next() : res.status(401).redirect("/auth");
});

// rest apis
app.use("/api", allApiRoutes);

// main dashboard pages
app.use("/", express.static(path.join(__dirname, "views/site/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "views/site/build/index.html"));
});

// declaring express listener
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
