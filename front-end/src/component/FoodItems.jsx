import React, { useState } from 'react';
import MargheritaPizza from '../img/Margherita_Pizza.jpeg';
import PepperoniPizza from '../img/Pepperoni_Pizza.jpeg';
import VeggiePizza from '../img/Veggie_Pizza.jpg';
import BBQChickenPizza from '../img/BBQ_Chicken_Pizza.jpg';
import PaneerPizza from '../img/Paneer_Pizza.jpg';
import CheeseBurger from '../img/Cheese_Burger.jpg';
import ChickenBurger from '../img/Chicken_Burger.jpg';
import VeggieBurger from '../img/Veggie_Burger.jpg';
import SpicyChickenBurger from '../img/Spicy_Chicken_Burger.jpg';
import SpicyTunaRoll from '../img/Spicy_Tuna_Roll.jpg';
// import CaliforniaRoll from '../img/California_Roll.jpeg';
// import VegetableRoll from '../img/Vegetable_Roll.jpeg';
// import ButterChicken from '../img/Butter_Chicken.jpeg';
// import PaneerTikka from '../img/Paneer_Tikka.jpeg';
// import DalMakhani from '../img/Dal_Makhani.jpeg';
// import VegBiryani from '../img/Veg_Biryani.jpeg';
// import ChocolateCake from '../img/Chocolate_Cake.jpeg';
// import Tiramisu from '../img/Tiramisu.jpeg';
// import GulabJamun from '../img/Gulab_Jamun.jpeg';
// import IceCreamSundae from '../img/Ice_Cream_Sundae.jpeg';


const dummyFoodData = [
  // Pizza (5 items)
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 199, image: MargheritaPizza },
  { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 249, image: PepperoniPizza },
  { id: 3, name: 'Veggie Pizza', category: 'Pizza', price: 229, image: VeggiePizza },
  { id: 4, name: 'BBQ Chicken Pizza', category: 'Pizza', price: 279, image: BBQChickenPizza },
  { id: 5, name: 'Paneer Pizza', category: 'Pizza', price: 239, image: PaneerPizza },

  // Burgers (4 items)
  { id: 6, name: 'Cheese Burger', category: 'Burger', price: 149, image:CheeseBurger },
  { id: 7, name: 'Chicken Burger', category: 'Burger', price: 169, image: ChickenBurger },
  { id: 8, name: 'Veggie Burger', category: 'Burger', price: 129, image:VeggieBurger },
  { id: 9, name: 'Spicy Chicken Burger', category: 'Burger', price: 179, image: SpicyChickenBurger },

  // Sushi (3 items)
  { id: 10, name: 'Spicy Tuna Roll', category: 'Sushi', price: 249, image: SpicyTunaRoll },
  { id: 11, name: 'California Roll', category: 'Sushi', price: 229, image: 'https://source.unsplash.com/random/300x200/?california,roll' },
  { id: 12, name: 'Vegetable Roll', category: 'Sushi', price: 199, image: 'https://source.unsplash.com/random/300x200/?vegetable,sushi' },

  // Indian (4 items)
  { id: 13, name: 'Butter Chicken', category: 'Indian', price: 249, image: 'https://source.unsplash.com/random/300x200/?butter,chicken' },
  { id: 14, name: 'Paneer Tikka', category: 'Indian', price: 199, image: 'https://source.unsplash.com/random/300x200/?paneer,tikka' },
  { id: 15, name: 'Dal Makhani', category: 'Indian', price: 179, image: 'https://source.unsplash.com/random/300x200/?dal,makhani' },
  { id: 16, name: 'Veg Biryani', category: 'Indian', price: 189, image: 'https://source.unsplash.com/random/300x200/?vegetable,biryani' },

  // Desserts (4 items)
  { id: 17, name: 'Chocolate Cake', category: 'Dessert', price: 99, image: 'https://source.unsplash.com/random/300x200/?chocolate,cake' },
  { id: 18, name: 'Tiramisu', category: 'Dessert', price: 129, image: 'https://source.unsplash.com/random/300x200/?tiramisu' },
  { id: 19, name: 'Gulab Jamun', category: 'Dessert', price: 79, image: 'https://source.unsplash.com/random/300x200/?gulab,jamun' },
  { id: 20, name: 'Ice Cream Sundae', category: 'Dessert', price: 119, image: 'https://source.unsplash.com/random/300x200/?icecream,sundae' },
];

const FoodItems = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(
    dummyFoodData.map(item => ({ ...item, quantity: 0 }))
  );

  const handleQuantityChange = (id, delta) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const handleAddToCart = (item) => {
    if (item.quantity > 0) {
      alert(`${item.quantity} x ${item.name} added to cart!`);
    }
  };

  const handleOrderNow = (item) => {
    if (item.quantity > 0) {
      alert(`Order placed for ${item.quantity} x ${item.name}`);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4" style={{ color: '#3C3D37', fontWeight: 'bolder' }}>
        Eat What You Want
      </h3>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search food items..."
        width={'50%'}
        style={{ margin: '0 auto', maxWidth: '400px' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredItems.map(item => (
          <div className="col-md-3 mb-4" key={item.id}>
            <div className="card h-100 shadow-sm border-0" style={{ height: '350px' }}>
              <img 
                src={item.image} 
                className="card-img-top" 
                alt={item.name}
                style={{ height: '120px', objectFit: 'cover' }}
              />
              <div className="card-body p-3 d-flex flex-column">
                <h6 className="card-title text-center mb-2" style={{ fontSize: '1rem' }}>{item.name}</h6>
                <p className="text-center text-muted mb-2">₹{item.price}</p>
                
                <div className="d-flex justify-content-center align-items-center mb-3">
                <button 
                    className="btn btn-sm py-1 px-2" 
                    onClick={() => handleAddToCart(item)}
                    disabled={item.quantity === 0}
                    style={{ marginRight:'1rem', fontSize: '1rem', width: '15%' }}
                  >
                    🛒
                  </button>

                  <button 
                    className="btn btn-sm btn-outline-secondary px-2 py-1" 
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="mx-2" style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button 
                    className="btn btn-sm btn-outline-secondary px-2 py-1" 
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                  <div className="mt-auto d-flex justify-content-between">
                  
                  <button 
                    className="btn btn-warning btn-sm py-1 px-2" 
                    onClick={() => handleOrderNow(item)}
                    disabled={item.quantity === 0}
                    style={{ marginLeft:'1rem',fontSize: '0.75rem',width: '85%' ,minWith:'20px'}}
                  >
                    Order Now
                  </button>
                </div>
                </div>

               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodItems;