const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  foodId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String, // Assuming foodId is a string, adjust if it's an ObjectId
    ref: 'Food', // make sure you have a Food model
    required: true
  },
  name: {
    type: String,
    required: true
  },
 imageUrl: {
    type: String
  }, 
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // make sure you have a User model
    required: true,
    unique: true
  },
  items: [CartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', CartSchema);
