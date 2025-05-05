// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const { findOne } = require("../model/cart.model");

// The current database to use.
use("Food");
// db.restaurants.findOne({email:"KFC@gmail.com"});

db.restaurants.find().pretty()

// Find a document in a collection.
// db.getCollection("restaurants").findOne({

// });
