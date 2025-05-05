const Restaurant = require('../model/restaurant.model.js'); // Adjust path if needed

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    const formattedRestaurants = restaurants.map((restaurant) => ({
      id: restaurant._id, // DataGrid needs `id`, not `_id`
      restaurantName: restaurant.restaurantName,
      categories: restaurant.categories,
      address: restaurant.address,
      city: restaurant.city,
      pincode: restaurant.pincode,
      contactNumber: restaurant.contactNumber,
      ownerName: restaurant.ownerName,
      email: restaurant.email,
    }));

    res.status(200).json({ success: true, restaurants: formattedRestaurants });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = getRestaurants;
