import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar,
  Button, Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../img/favicon.png';

// ✅ Local category images
import pizzaImg from '../img/pizza.jpg';
import burgerImg from '../img/burger.jpg';
import sushiImg from '../img/sushi.jpg';
import dessertImg from '../img/dessert.jpg';

const pages = ['Categories', 'Restaurants', 'About us', 'Contact us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#123458' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={logo}
            alt="Foodie Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />

          <Typography variant="h6" noWrap component="a" href="#"
            sx={{
              mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
              fontWeight: 700, letterSpacing: '.2rem', color: '#FFF', textDecoration: 'none'
            }}>
            HOME
          </Typography>

          {/* Mobile Nav */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon sx={{ color: '#FFF' }} />
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
                sx={{ my: 2, color: '#FFF', fontWeight: 600, '&:hover': { backgroundColor: '#2563EB', color: 'white' } }}>
                {page}
              </Button>
            ))}
          </Box>

          <Button>
            <ShoppingCartIcon sx={{ mr: 3, fontSize: 30, color: '#FFF' }} />
          </Button>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === 'Logout') {
                      navigate('/login');
                    }
                  }}
                >
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // ✅ Local categories array with images
  const categories = [
    { name: 'Pizza', img: pizzaImg },
    { name: 'Burger', img: burgerImg },
    { name: 'Sushi', img: sushiImg },
    { name: 'Dessert', img: dessertImg },
  ];

  return (
    <>
      <ResponsiveAppBar />

      {/* Hero Section */}
      <section
        className={`text-center py-5 ${loaded ? 'fade-in' : ''}`}
        style={{ backgroundColor: '#D4C9BE', color: '#3C3D37' }}
      >
        <h2 style={{ fontWeight: '700' }}>Delicious food, delivered to you!</h2>
        <p>Experience the best food from your favorite restaurants in just a few clicks.</p>
        <Button variant="contained" sx={{ backgroundColor: '#222222', color: 'white', mt: 2 }}>Order Now</Button>
      </section>

      {/* Popular Categories */}
      <section className={`container text-center py-5 ${loaded ? 'fade-in' : ''}`}>
        <h3 className="mb-4" style={{ color: '#3C3D37', fontWeight: 'bolder' }}>Popular Categories</h3>
        <div className="row">
          {categories.map((item, idx) => (
            <div className="col-md-3 mb-4" key={idx}>
              <div className="card h-100 shadow-sm">
                <img src={item.img} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: '#2563EB' }}>{item.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="bg-[#1D4ED8] text-white py-5">
        <div className="container text-center">
          <h3 className="mb-4" style={{ color: '#3C3D37', fontWeight: 'bolder' }}>Featured Restaurants</h3>
          <div className="row">
            {[1, 2, 3].map((r) => (
              <div className="col-md-4 mb-4" key={r}>
                <div className="card text-dark h-100">
                  <img src={`https://source.unsplash.com/400x250/?restaurant,food,${r}`} className="card-img-top" alt="Restaurant" />
                  <div className="card-body">
                    <h5 className="card-title">{`Restaurant ${r}`}</h5>
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
        <h3 className="mb-4" style={{ color: '#3C3D37', fontWeight: 'bolder' }}>Why Choose Us?</h3>
        <div className="row">
          {[
            { icon: '🚀', title: 'Fast Delivery' },
            { icon: '🍽️', title: 'Top Restaurants' },
            { icon: '💸', title: 'Affordable Prices' },
            { icon: '⭐', title: 'Rated by Users' }
          ].map((item, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="p-4 border rounded" style={{ backgroundColor: '#123458', color: 'white' }} >
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
          <h3 className="mb-4" style={{ color: '#3C3D37', fontWeight: 'bolder' }}>What Our Customers Say</h3>
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
      <footer className="bg-[#1E40AF] text-white py-4 text-center" style={{ backgroundColor: '#ECDFCC' }}>
        <p style={{ color: '#3C3D37', fontWeight: 'bolder' }} className="mb-0">&copy; 2025 Online Food Delivery. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
