const Restaurant = require('../model/restaurant.model.js'); // Adjust path if needed
const mongoose = require('mongoose'); // Import mongoose for ObjectId type
const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose

const updateRestaurant = async (req, res) => {
    const { restaurantId , restaurantName, categories, address, city, pincode, contactNumber, ownerName, email } = req.body;
    
    try {
        // Check if the restaurant exists
        const restaurant = await Restaurant.findOne({email});
        if (!restaurant) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
    
        // Update the restaurant details
        restaurant.restaurantName = restaurantName;
        restaurant.categories = categories;
        restaurant.address = address;
        restaurant.city = city;
        restaurant.pincode = pincode;
        restaurant.contactNumber = contactNumber;
        restaurant.ownerName = ownerName;
        restaurant.email = email;
    
        await restaurant.save();
    
        res.status(200).json({ success: true, message: 'Restaurant updated successfully' });
    } 
    catch (error) {
        console.log('Error updating restaurant:', error);
        console.error('Error updating restaurant:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
    }

module.exports = updateRestaurant;