//Requiring Dependencies//
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const User = require('./models/user');
const path = require('path');
require('dotenv').config();

// const initDB = require('./initDB');
// initDB();

//Using Dependencies
// mongoose.connect('mongodb://127.0.0.1:27017/foodup', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());


app.use(express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'gr8/public')));
app.use(methodOverride('_method'));
// app.use(
//   expressSession({
//     secret: 'slfsjfhkdshgkfdsh',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(flash());
app.use(cookieParser());

//Initializing Passport//
app.use(passport.initialize());
app.use(passport.session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set secure to true in production with HTTPS
}));

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Routes
app.use(require('./routes/indexRoute'));
app.use(require('./routes/contribRoute'));
app.use(require('./routes/commentsRoute'));
app.use(require('./routes/userRoute'));

// app.use((req, res, next) => {
//   res.status(404).render('error');
// });

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/*', (req, res) => {
//   console.log('Request received:', req.url);
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.listen(process.env.PORT || 3006, () => {
  console.log('Server started at PORT: 3006');
});
