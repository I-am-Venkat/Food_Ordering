const Food = require('../model/food.model'); // .js extension is optional in Node.js

// @desc    Get all foods
// @route   GET /api/foods/getFoods
// @access  Public
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().lean(); // .lean() for plain JS objects
    
    // Format response to match frontend expectations
    const response = {
      success: true,
      foods: foods.map(food => ({
        // id: food._id.toString(), // Convert ObjectId to string
        foodId: food.foodId,    // Include foodId if needed
        name: food.name,
        description: food.description,
        price: food.price,
        category: food.category,
        imageUrl: food.imageUrl
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching foods',
      error: error.message 
    });
  }
};

module.exports = getFoods;
