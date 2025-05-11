const Food = require('../model/food.model');

const deleteFood = async (req, res) => {
    try {
        const { foodId } = req.params;

        // Find and delete the food item
        const deletedFood = await Food.findOneAndDelete({ foodId });

        if (!deletedFood) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Food item deleted successfully",
            data: deletedFood
        });

    } catch (error) {
        console.error('Error deleting food item:', error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = deleteFood;