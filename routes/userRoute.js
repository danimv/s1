const express = require('express');
const router = express.Router();
const FoodData = require('../models/user');
const Comment = require('../models/comment');
const middleware = require('../middleware');

//Comments route//
router.get('/user/:id',
  middleware.isLoggedIn,
  async (req, res) => {
    try {
      const userData = await FoodData.findById(req.params.id);
      res.render('profile/showUser', { userData });
    } catch (err) {
      console.log(err);
      res.render('/', { userData });
    }
  }
);

module.exports = router;
