import React, { useState } from 'react';
import { Button } from '@mui/material';

const sampleFoods = [
  { id: 1, name: 'Margherita Pizza', price: 250, image: 'https://source.unsplash.com/400x250/?pizza' },
  { id: 2, name: 'Cheese Burger', price: 180, image: 'https://source.unsplash.com/400x250/?burger' },
  { id: 3, name: 'Sushi Roll', price: 300, image: 'https://source.unsplash.com/400x250/?sushi' },
  { id: 4, name: 'Chocolate Cake', price: 150, image: 'https://source.unsplash.com/400x250/?dessert' },
  { id: 5, name: 'Pasta Alfredo', price: 220, image: 'https://source.unsplash.com/400x250/?pasta' },
  { id: 6, name: 'Grilled Sandwich', price: 130, image: 'https://source.unsplash.com/400x250/?sandwich' },
  { id: 7, name: 'Tandoori Chicken', price: 350, image: 'https://source.unsplash.com/400x250/?tandoori' },
  { id: 8, name: 'Paneer Tikka', price: 200, image: 'https://source.unsplash.com/400x250/?paneer' },
  { id: 9, name: 'Veg Biryani', price: 170, image: 'https://source.unsplash.com/400x250/?biryani' },
  { id: 10, name: 'Chicken Biryani', price: 270, image: 'https://source.unsplash.com/400x250/?chickenbiryani' },
  { id: 11, name: 'Momos', price: 120, image: 'https://source.unsplash.com/400x250/?momos' },
  { id: 12, name: 'Falafel Wrap', price: 150, image: 'https://source.unsplash.com/400x250/?falafel' },
  { id: 13, name: 'Idli Sambhar', price: 100, image: 'https://source.unsplash.com/400x250/?idli' },
  { id: 14, name: 'Dosa', price: 120, image: 'https://source.unsplash.com/400x250/?dosa' },
  { id: 15, name: 'Butter Naan', price: 40, image: 'https://source.unsplash.com/400x250/?naan' },
  { id: 16, name: 'Chole Bhature', price: 150, image: 'https://source.unsplash.com/400x250/?cholebhature' },
  { id: 17, name: 'Vada Pav', price: 60, image: 'https://source.unsplash.com/400x250/?vadapav' },
  { id: 18, name: 'Pav Bhaji', price: 130, image: 'https://source.unsplash.com/400x250/?pavbhaji' },
  { id: 19, name: 'Fried Rice', price: 160, image: 'https://source.unsplash.com/400x250/?friedrice' },
  { id: 20, name: 'Spring Rolls', price: 140, image: 'https://source.unsplash.com/400x250/?springrolls' },
  { id: 21, name: 'French Fries', price: 100, image: 'https://source.unsplash.com/400x250/?fries' },
  { id: 22, name: 'Milkshake', price: 90, image: 'https://source.unsplash.com/400x250/?milkshake' },
  { id: 23, name: 'Ice Cream Sundae', price: 130, image: 'https://source.unsplash.com/400x250/?icecream' },
  { id: 24, name: 'Onion Rings', price: 110, image: 'https://source.unsplash.com/400x250/?onionrings' },
  { id: 25, name: 'Hakka Noodles', price: 170, image: 'https://source.unsplash.com/400x250/?hakka' },
  { id: 26, name: 'Chicken Wings', price: 220, image: 'https://source.unsplash.com/400x250/?wings' },
  { id: 27, name: 'Nachos', price: 150, image: 'https://source.unsplash.com/400x250/?nachos' },
  { id: 28, name: 'Tacos', price: 160, image: 'https://source.unsplash.com/400x250/?tacos' },
  { id: 29, name: 'Pancakes', price: 180, image: 'https://source.unsplash.com/400x250/?pancakes' },
  { id: 30, name: 'Waffles', price: 200, image: 'https://source.unsplash.com/400x250/?waffles' },
];

const FoodItemsPage = () => {
  const [cartItems, setCartItems] = useState({});

  const handleQuantityChange = (id, action) => {
    setCartItems((prev) => {
      const currentQty = prev[id]?.quantity || 0;
      const newQty = action === 'inc' ? currentQty + 1 : Math.max(currentQty - 1, 0);

      if (newQty === 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }

      return {
        ...prev,
        [id]: { ...sampleFoods.find((item) => item.id === id), quantity: newQty }
      };
    });
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Choose Your Favorite Dishes 🍽️</h2>
        <Button variant="contained" sx={{ backgroundColor: '#123458' }}>Proceed to Checkout</Button>
      </div>
      <div className="row">
        {sampleFoods.map((food) => (
          <div className="col-md-3 mb-4" key={food.id}>
            <div className="card h-100 shadow-sm">
              <img src={food.image} className="card-img-top" alt={food.name} />
              <div className="card-body text-center">
                <h5>{food.name}</h5>
                <p>₹{food.price}</p>
                <div className="d-flex justify-content-center align-items-center">
                  <Button onClick={() => handleQuantityChange(food.id, 'dec')} variant="contained" sx={{ minWidth: 40, backgroundColor: '#222' }}>−</Button>
                  <span className="mx-3">{cartItems[food.id]?.quantity || 0}</span>
                  <Button onClick={() => handleQuantityChange(food.id, 'inc')} variant="contained" sx={{ minWidth: 40, backgroundColor: '#222' }}>+</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodItemsPage;
