const Restaurant = require('../model/restaurant.model.js');

const addRestaurant = async (req, res) => {
  const formData = req.body;
  try {
    const existingRestaurant = await Restaurant.findOne({
      $or: [
        { contactNumber: formData.contactNumber },
        { email: formData.email }
      ]
    });
    
    if (existingRestaurant) {
        return res.status(409).json({
          success: false,
          message: "Restaurant already exists"
        });
      }
    // Use create() method to add the restaurant to the MongoDB collection
    await Restaurant.create({
      restaurantName: formData.restaurantName,
      categories: formData.categories,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      contactNumber: formData.contactNumber,
      ownerName: formData.ownerName,
      email: formData.email
    });
    
    return res.status(200).send({success:true,msg:"Restaurant Added Successfully!"});
  } catch (err) {
    console.error("Error adding restaurant:", err);
    return res.status(400).send("Restaurant Not Added");
  }
};

module.exports = addRestaurant;
