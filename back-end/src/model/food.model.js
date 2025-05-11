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
    type: String,
  },
  // Removed imageUrl field completely
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);