const express = require("express");
const app = express();
const connectDB = require("./db");
require("dotenv").config();
const { PORT, SECRET } = process.env;
const bodyParser = require("body-parser");
const User = require("./models/user");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");



app.use(express.json({ extended: false }));
// SEEDERS
const { seedAdmin } = require("./seeders/admin");

// SETUP DB
connectDB();
const initRoutes = require("./routes/routes");
app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  require("express-session")({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    expires: new Date(Date.now() + 30 * 80000 * 1000),
    cookie: {
      maxAge: 30 * 80000 * 1000,
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use("local", new LocalStrategy(User.authenticate()));

initRoutes(app);
const port = process.env.PORT || PORT;
app.listen(port, () => console.log(`app running on port ${port}`));
// app.use('/auth', authRoutes);
// app.use(userRoute);
