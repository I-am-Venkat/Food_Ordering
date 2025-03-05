
import React from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import logoImage from "../Images/logo-2.png";
import logo from "../../img/favicon.jpg";


const Header = ({ setIsSidebarOpen }) => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: " #2479d9;", zIndex: 1300 }}>
      <Toolbar>
        {/* Sidebar Toggle Button */}
        <IconButton 
          edge="start" 
          color="inherit" 
          onClick={() => setIsSidebarOpen(prev => !prev)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        {/* <Button> */}
        {/* Rectangle Image Logo */}
        <Box
          component="img"
          src={logo}  
          alt="Logo"
          sx={{
            width: 100,  
            height: 40,  
            objectFit: "contain",
            mr: "auto",  // Push profile icon to the right
          }}
        />
        {/* </Button> */}

        {/* Profile Icon */}
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}; 

export default Header;
