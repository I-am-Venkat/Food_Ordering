const Cart=require('../model/cart.model');
const Food=require('../model/food.model');
const User=require('../model/user.model');

const addToCart=async(req,res)=>{
    const {foodId,quantity}=req.body;
    const userId=req.userId; // Assuming you have middleware to set req.user

    try {
        // Check if the food item exists
        const foodItem = await Food.findOne({ foodId });
        console.log(foodId);
        if (!foodItem) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }

        // Check if the cart already exists for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({ userId, items: [] });
        }

        // Check if the food item is already in the cart
        const existingItemIndex = cart.items.findIndex(item => item.foodId.toString() === foodItem._id.toString());

        if (existingItemIndex > -1) {
            // If the item is already in the cart, update its quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // If the item is not in the cart, add it
            cart.items.push({
                foodId: foodItem._id,
                name: foodItem.name,
                imageUrl: foodItem.imageUrl,
                price: foodItem.price,
                quantity
            });
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({ success: true, message: 'Food item added to cart successfully', cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
module.exports=addToCart;