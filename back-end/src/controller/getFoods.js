const Food = require('../model/food.model');

const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      foods: foods.map(food => ({
        foodId: food.foodId,
        name: food.name,
        description: food.description,
        price: food.price,
        category: food.category
      }))
    });

  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching foods",
      error: error.message
    });
  }
};

module.exports = getFoods;