// const express = require('express');
// const mongoose = require('mongoose');
const validateUser=async (req, res) => {
    const { mobilenumber, password } = req.body;
  
    try {
      const user = await User.findOne({ mobilenumber });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid mobile number or password' });
      }
  
      res.status(200).json({ success: true, message: 'Login successful' });
  
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  module.exports = validateUser;