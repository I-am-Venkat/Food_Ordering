const Food = require('../model/food.model');
const path = require('path');
const fs = require('fs');

const updateFood = async (req, res) => {
    try {
        const { foodId } = req.params;
        const { name, description, price, category } = req.body;
        
        const foodItem = await Food.findOne({ foodId });
        if (!foodItem) {
            return res.status(404).json({ 
                success: false, 
                message: "Food item not found" 
            });
        }

        // Update fields
        foodItem.name = name;
        foodItem.description = description;
        foodItem.price = price;
        foodItem.category = category;

        // Handle image upload if exists
        if (req.file) {
            // Delete old image if exists
            if (foodItem.imageUrl) {
                const oldImagePath = path.join(__dirname, '..', 'FoodImages', 
                    path.basename(foodItem.imageUrl));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            foodItem.imageUrl = `/FoodImages/${req.file.filename}`;
        }

        await foodItem.save();

        res.status(200).json({
            success: true,
            message: "Food updated successfully",
            data: foodItem
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