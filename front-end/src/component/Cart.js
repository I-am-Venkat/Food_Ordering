import React, { useState } from 'react';
import { Container, Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MargheritaPizza from '../img/Margherita_Pizza.jpeg';
import Sushi from '../img/sushi.jpg';
import CheeseBurger from '../img/Cheese_Burger.jpg';
import CartImage from '../img/Cart.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // for back arrow icon
// import Logo from '..'; // replace with your actual logo path

// import ResponsiveAppBar from './ResponsiveAppBar'; // Assuming you have this component

const Cart = () => {
  // Sample cart data (replace with your actual cart state management)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Margherita Pizza', price: 199, quantity: 2, image: MargheritaPizza },
    { id: 2, name: 'Cheeseburger', price: 149, quantity: 1, image: CheeseBurger },
    { id: 3, name: 'Sushi Platter', price: 99, quantity: 1, image: Sushi },
  ]);

  // Handle quantity changes
  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <>
      {/* <ResponsiveAppBar /> */}

      <Container maxWidth="lg" sx={{ py: 5 }}>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
  <Button
    component={Link}
    to="/Home"
    startIcon={<ArrowBackIcon />}
    sx={{
      color: '#2563EB',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
      mr: 2,
    }}
  >
    Back
  </Button>
  {/* <img
    src={Logo}
    alt="Logo"
    style={{
      height: '50px',
      objectFit: 'contain',
    }}
  /> */}
</Box>

        <Typography variant="h4" sx={{ color: '#3C3D37', fontWeight: 'bolder', mb: 4, textAlign: 'center' }}>
            
          Your Cart
          <img src={CartImage} alt="Cart" style={{ height:'75px' , width:'75px',objectFit:'contain'}}/>
        </Typography>

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6" sx={{ color: '#3C3D37', mb: 2 }}>
              Your cart is empty.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/Home"
              sx={{ backgroundColor: '#2563EB', color: 'white', '&:hover': { backgroundColor: '#1E40AF' } }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            {/* Cart Table */}
            <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#123458' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Item</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Subtotal</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id} sx={{ '&:hover': { backgroundColor: '#D4C9BE' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginRight: '10px' }}
                          />
                          <Typography sx={{ color: '#3C3D37' }}>{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#3C3D37' }}>Rs.{item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton onClick={() => updateQuantity(item.id, -1)} sx={{ color: '#2563EB' }}>
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ mx: 2, color: '#3C3D37' }}>{item.quantity}</Typography>
                          <IconButton onClick={() => updateQuantity(item.id, 1)} sx={{ color: '#2563EB' }}>
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#3C3D37' }}>
                        Rs.{(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeItem(item.id)} sx={{ color: '#D32F2F' }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Cart Summary */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ width: { xs: '100%', md: '40%' }, p: 3, backgroundColor: '#ECDFCC', borderRadius: '8px' }}>
                <Typography variant="h6" sx={{ color: '#3C3D37', fontWeight: 'bold', mb: 2 }}>
                  Order Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#3C3D37' }}>Subtotal</Typography>
                  <Typography sx={{ color: '#3C3D37' }}>Rs.{calculateTotal()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#3C3D37' }}>Delivery Fee</Typography>
                  <Typography sx={{ color: '#3C3D37' }}>Rs.5.00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid #3C3D37' }}>
                  <Typography sx={{ color: '#3C3D37', fontWeight: 'bold' }}>Total</Typography>
                  <Typography sx={{ color: '#3C3D37', fontWeight: 'bold' }}>
                    Rs.{(parseFloat(calculateTotal()) + 5.00).toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, backgroundColor: '#2563EB', color: 'white', '&:hover': { backgroundColor: '#1E40AF' } }}
                  component={Link}
                  to="/checkout"
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </Box>

            {/* Continue Shopping */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="outlined"
                component={Link}
                to="/Home"
                sx={{ color: '#2563EB', borderColor: '#2563EB', '&:hover': { backgroundColor: '#D4C9BE' } }}
              >
                Continue Shopping
              </Button>
            </Box>
          </>
        )}
      </Container>

      {/* Footer */}
      <footer className="bg-[#1E40AF] text-white py-4 text-center" style={{ backgroundColor: '#ECDFCC' }}>
        <Typography sx={{ color: '#3C3D37', fontWeight: 'bolder' }}>
          © 2025 Online Food Delivery. All rights reserved.
        </Typography>
      </footer>
    </>
  );
};

export default Cart;