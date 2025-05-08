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


// const FoodItem = require('../model/food.model');
// const Counter = require('../model/counter.model');

// const addFood = async (req, res) => {
//     try {
//         console.log("Request body:", req.body);
//         console.log("Uploaded file:", req.file);
       
//         const { name, description, price, category } = req.body;
//         if (!name || !price || !category) {
//           return res.status(400).json({
//               success: false,
//               message: "Name, price and category are required"
//           });
//       }
//         // Validate required fields
//         // if (!req.file) {
//         //     return res.status(400).json({
//         //         success: false,
//         //         message: "Image file is required"
//         //     });
//         // }
        
//         // Validate other required fields
        

//         // Check if food with the same name exists
//         const existingFood = await FoodItem.findOne({ name });
//         if (existingFood) {
//             return res.status(409).json({
//                 success: false,
//                 message: "Food item already exists"
//             });
//         }

//         // Generate a new foodId using the Counter model
//         const counter = await Counter.findOneAndUpdate(
//             { name: 'foodItemId' },
//             { $inc: { sequenceValue: 1 } },
//             { new: true, upsert: true }
//         );

//         const foodId = 'f' + counter.sequenceValue;

//         // Create new food item
//         const newFoodItem = new FoodItem({
//             foodId,
//             name,
//             description: description || '',
//             price: parseFloat(price),
//             category,
//             imageUrl: `/FoodImages/${req.file?.filename ||'noimage.jpg'}` // Default image if not provided
//         });

//         await newFoodItem.save();

//         res.status(201).json({
//             success: true,
//             message: 'Food item added successfully',
//             foodId,
//             data: newFoodItem
//         });
//     } catch (error) {
//         console.error('Error adding food item:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Server error'
//         });
//     }
// };

// module.exports = addFood;