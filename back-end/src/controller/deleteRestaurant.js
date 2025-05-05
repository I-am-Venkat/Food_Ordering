
const Restaurant = require('../model/restaurant.model.js'); // adjust path if needed

const deleteRestaurant = async (req, res) => {
  try {
    const email = req.params.email;
    const deleted = await Restaurant.findOneAndDelete({ email });

    if (!deleted) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json({ success: true,status:200, message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = deleteRestaurant;
