const FoodItem = require('../model/food.model.js');
const Counter = require('../model/counter.model.js');

const addFoodItem = async (req, res) => {   
    const { name, description, price, category, imageUrl } = req.body;
    
    try {
        // Generate a new foodId using the Counter model
        const counter = await Counter.findOneAndUpdate(
        { name: 'foodItemId' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
        );
    
        const foodId = 'f' + counter.sequenceValue;
    
        // Create a new food item
        const newFoodItem = new FoodItem({
        foodId,
        name,
        description,
        price,
        category,
        imageUrl,
        });
    
        await newFoodItem.save();
    
        res.status(201).json({ success: true, message: 'Food item added successfully', foodId });
    } catch (error) {
        console.error('Error adding food item:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
    }
module.exports = addFoodItem;
