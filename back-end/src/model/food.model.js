const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  foodId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String, // e.g., 'Pizza', 'Drinks', 'Dessert'
  },
  imageUrl: {
    type: String,
  },

});

const Food = mongoose.model('FoodItem', foodItemSchema);
module.exports = Food;
