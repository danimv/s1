const express = require('express');
const router = express.Router();
const FoodData = require('../models/contrib');
const Comment = require('../models/comment');
const middleware = require('../middleware');

//Comments route//
// router.get(
//   '/contrib/:id/comments/new',
//   middleware.isLoggedIn,
//   async (req, res) => {
//     try {
//       const foodData = await FoodData.findById(req.params.id);
//       res.render('comments/new', { foodData });
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

// router.post('/contrib/:id/comments', middleware.isLoggedIn, async (req, res) => {
//   try {
//     const { _id, username } = req.user;
//     const foodData = await FoodData.findById(req.params.id);
//     const comment = await Comment.create(req.body.comment);
//     comment.author.id = _id;
//     comment.author.username = username;
//     await comment.save();

//     foodData.comments.push(comment);
//     await foodData.save();

//     res.redirect('/contrib/' + foodData.id);
//   } catch (err) {
//     console.log(err);
//     res.redirect('/contrib');
//   }
// });

module.exports = router;
