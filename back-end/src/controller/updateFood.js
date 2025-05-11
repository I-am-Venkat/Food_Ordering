
const Food = require('../model/food.model'); // Ensure this path is correct
const updateFood = async (req, res) => {
  try {
    console.log('Received update request for:', req.params.foodId);
    console.log('Request body:', req.body);

    const { foodId } = req.params;
    const { name, description, price, category } = req.body;
    
    // Explicit collection access
    const food = await Food.findOneAndUpdate(
      { foodId: foodId },
      {
        $set: {
          ...(name && { name }),
          ...(description && { description }),
          ...(price && { price: parseFloat(price) }),
          ...(category && { category })
        }
      },
      { new: true, useFindAndModify: false }
    ).collation({ locale: 'en', strength: 2 }); // Case-insensitive search

    if (!food) {
      console.log('Food not found in DB');
      return res.status(404).json({
        success: false,
        message: "Food not found"
      });
    }

    console.log('Updated food:', food);
    res.status(200).json({
      success: true,
      message: "Food updated successfully",
      data: food
    });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
module.exports = updateFood;