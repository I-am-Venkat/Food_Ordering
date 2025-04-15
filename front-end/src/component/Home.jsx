import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar,
  Button, Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../img/favicon.jpg';


const pages = ['Categories', 'Restaurants', 'About us', 'Contact us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1c1c1c' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#FFD700' }} /> */}

        <img
          src={logo}
          alt="Foodie Logo"
          style={{ height: '40px', marginRight: '10px' }}
        />

          <Typography variant="h6" noWrap component="a" href="#"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.2rem', color: '#FFD700', textDecoration: 'none' }}>
            HOME
          </Typography>

          {/* Mobile Nav */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon sx={{ color: '#FFD700' }} />
            </IconButton>
            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center', color: '#333' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#FFD700', fontWeight: 600, '&:hover': { backgroundColor: '#333', color: 'white' } }}>
                {page}
              </Button>
            ))}
          </Box>

          <Button>
            <ShoppingCartIcon sx={{ mr: 3, fontSize: 30, color: '#FFD700' }} />
          </Button>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const Home = () => {
  return (
    <>
      <ResponsiveAppBar />

      {/* Carousel */}
      <div id="carouselExample" className="carousel slide" style={{ maxWidth: '90%', margin: '2rem auto', borderRadius: '12px', overflow: 'hidden' }}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/1200x400/?food" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/1200x400/?restaurant" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/1200x400/?cooking" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="text-center py-5 bg-light">
        <h2 style={{ fontWeight: '700' }}>Delicious food, delivered to you!</h2>
        <p>Experience the best food from your favorite restaurants in just a few clicks.</p>
        <Button variant="contained" sx={{ backgroundColor: '#FFD700', color: '#000', mt: 2 }}>Order Now</Button>
      </section>

      {/* Popular Categories */}
      <section className="container text-center py-5">
        <h3 className="mb-4">Popular Categories</h3>
        <div className="row">
          {['Pizza', 'Burger', 'Sushi', 'Dessert'].map((item, idx) => (
            <div className="col-md-3 mb-4" key={idx}>
              <div className="card h-100 shadow-sm">
                <img src={`https://source.unsplash.com/300x200/?${item}`} className="card-img-top" alt={item} />
                <div className="card-body">
                  <h5 className="card-title">{item}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center">
          <h3 className="mb-4">Featured Restaurants</h3>
          <div className="row">
            {[1, 2, 3].map((r) => (
              <div className="col-md-4 mb-4" key={r}>
                <div className="card text-dark h-100">
                  <img src={`https://source.unsplash.com/400x250/?restaurant,food,${r}`} className="card-img-top" alt="Restaurant" />
                  <div className="card-body">
                    <h5 className="card-title">Restaurant {r}</h5>
                    <p className="card-text">Top rated dishes delivered fresh to your doorstep.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container py-5 text-center">
        <h3 className="mb-4">Why Choose Us?</h3>
        <div className="row">
          {[
            { icon: '🚀', title: 'Fast Delivery' },
            { icon: '🍽️', title: 'Top Restaurants' },
            { icon: '💸', title: 'Affordable Prices' },
            { icon: '⭐', title: 'Rated by Users' }
          ].map((item, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="p-4 border rounded">
                <h2>{item.icon}</h2>
                <h5>{item.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h3 className="mb-4">What Our Customers Say</h3>
          <div className="row">
            {[1, 2, 3].map((r) => (
              <div className="col-md-4 mb-4" key={r}>
                <div className="p-4 shadow-sm bg-white rounded">
                  <p>“Amazing service! The food was hot and fresh. Will definitely order again.”</p>
                  <strong>– Customer {r}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 text-center">
        <p className="mb-0">&copy; 2025 Online Food Delivery. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
