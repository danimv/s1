const foodData = require('../models/contrib');

// all the middleare goes here
var middlewareObj = {};

middlewareObj.isFoodPostOnwer = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send('back');
  }
  try {
    const foundFoodData = await foodData.findById(req.params.id);
    if (foundFoodData.author.id.equals(req.user.id)) {
      next();
    } else {
      res.send('back');
    }
  } catch (err) {
    res.send('back');
  }
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // console.log(req.isAuthenticated());
  res.send('/login');
};

module.exports = middlewareObj;
