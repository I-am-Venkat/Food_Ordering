const Food = require('../model/food.model');
const Counter = require('../model/counter.model');

const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required"
      });
    }

    // Generate food ID
    const counter = await Counter.findOneAndUpdate(
      { name: 'foodItemId' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    const foodId = 'f' + counter.sequenceValue;

    // Create food without image
    const newFood = new Food({
      foodId,
      name,
      description,
      price,
      category
    });

    await newFood.save();

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      data: newFood
    });

  } catch (error) {
    console.error('Error adding food:', error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = addFood;