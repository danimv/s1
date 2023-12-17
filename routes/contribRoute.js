const express = require('express');
const router = express.Router();
const FoodData = require('../models/contrib');
const contribTypes = require('../models/contribTypes');
const Comment = require('../models/comment');
const middleware = require('../middleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//FoodUp route//
//SHOW route//
// router.get("/contrib", async (_req, res) => {
//   try {
//     const foodData = await FoodData.find({});
//     res.send(foodData);
//     // res.render("contrib/index", { foodData });
//   } catch (err) {
//     console.log(err);
//   }
// });

// CREATE food route//
router.get('/contrib/new', middleware.isLoggedIn, async (_req, res) => {
  console.log(middleware);
  try {
    const contribtypes = await contribTypes.find({});
    res.send(contribtypes);
  } catch (err) {
    console.log(err);
  }
});

// router.post("/contrib/new", upload.single("image"), middleware.isLoggedIn, async (req, res) => {
//   try {
//     const { name, description, image, lloc, tipus, quantitat, unitat } = req.body;
//     const imageName = req.file.filename;
//     const imagePath = req.file.path;
//     const author = {
//       id: req.user._id,
//       username: req.user.username,
//     };

//     const newfoodData = { name, description, author, lloc, tipus, quantitat, unitat, imageName, imagePath };
//     await FoodData.create(newfoodData);
//     res.redirect("/");
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post('/contrib', async (req, res) => {
  // const id = req.params.id;
  try {
    // console.log(req.body.postId);
    // res.send("holaadda");
    const foundFoodData = await FoodData.findById(req.body.postId).populate('comments').exec();
    res.send(foundFoodData);

    // res.render("contrib/showContrib", { foundFoodData });
  } catch (err) {
    console.log(err);
  }
});

//EDIT food route//
// router.get("/contrib/:id/edit", middleware.isFoodPostOnwer, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const foundFoodData = await FoodData.findById(req.params.id);
//     res.render("contrib/edit", { foundFoodData });
//   } catch (err) {
//     res.redirect("/contrib/" + id);
//   }
// });

//UPDATE ROUTE//
// router.put("/contrib/:id", upload.single("image"), middleware.isFoodPostOnwer, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, lloc, tipus } = req.body;
//     const imageName = req.file.filename;
//     const updatedFoodData = {
//       name,
//       description,
//       lloc,
//       tipus,
//       imageName,
//     };
//     await FoodData.findByIdAndUpdate(id, updatedFoodData);
//     res.redirect("/contrib/" + id);
//     // res.redirect("/");
//   } catch (err) {
//     res.redirect("/");
//   }
// });

//DELETE ROUTE
// router.delete("/contrib/:id", middleware.isFoodPostOnwer, async (req, res) => {
//   try {
//     const food = await FoodData.findById(req.params.id);
//     if (food.comments.length > 0) {
//       food.comments.forEach(async (comment) => {
//         await Comment.findByIdAndRemove(comment);
//       });
//     }
//     food.remove();
//     res.redirect("/");
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
