const user = require("../model/user.model.js");

const SendData = async (req, res) => {
  const formData = req.body;

  try {
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match"
      });
    }

    // Check for duplicate mobile number
    const existingUser = await user.findOne({ mobilenumber: formData.mobilenumber }); // Make sure field name matches the schema
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // Create new user
    await user.create({
      name: formData.name,
      mobilenumber: formData.mobilenumber,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    });

    return res.status(200).json({
      success: true,
      message: "Data Inserted Successfully!"
    });

  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({
      success: false,
      message: "Error occurred while registering user",
      error: err.message
    });
  }
};

module.exports = SendData;
