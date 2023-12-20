const express = require('express');
const router = express.Router();
const FoodData = require('../models/contrib');
const passport = require('passport');
const User = require('../models/user');

//Index route//
// router.get('/', (req, res) => {
//   res.render('index');
// });

router.get('/', async (_req, res) => {
  // console.log(_req.user);
  try {
    const foodData = await FoodData.find({});
    res.send(foodData);
  } catch (err) {
    console.log(err);
  }
});

//Auth routes//
// router.get('/register', (req, res) => {
//   res.render('register');
// });

router.post('/register', async (req, res) => {
  try {
    console.log(req.body.postData);
    const { username, password, email } = req.body.postData;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    // if (existingUser || existingEmail) {
    //   return res.send({status:422, msg: `Ja existeix ${existingEmail.email} ${existingUser.username}`});
    // }
    if (existingUser?.username) return res.send({ status: 422, msg: `Ja existeix ${existingUser.username}` });

    if (existingEmail?.email) return res.send({ status: 422, msg: `Ja existeix ${existingEmail.email}` });

    let newUser = new User({ username, email });
    await User.register(newUser, password);
    // // passport.authenticate('local')(req, res, function () {
    // // res.render("index", { foodData });
    return res.send({ status: 200, msg: `T'has registrat: ${username} ${email}. Entra` });
    // });
  } catch (err) {
    // res.send(err);
    console.log(err);
    //res.render('register');
  }
});

// router.get('/login', (req, res) => {
//   res.render('login');
// });

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.cookie('user', req.user);
  console.log(req.user);
  res.json({ user: req.user });
});

router.get('/user', (req, res) => {
  console.log(req.user);
  res.json({ user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Sessió tancada');
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
