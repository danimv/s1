const mongoose = require('mongoose');

const contribDataSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  lloc: String,
  tipus: String,
  quantitat: String,
  unitat: String,
  imageName: String,
  imagePath: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const FoodData = mongoose.model('foodData', contribDataSchema);

module.exports = FoodData;
