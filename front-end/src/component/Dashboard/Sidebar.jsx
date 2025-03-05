import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
// import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"; 
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Sidebar = ({ isOpen }) => {
  return (
    <Drawer
      variant="persistent"
      open={isOpen} 
      sx={{
        width: isOpen ? 240 : 0,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: isOpen ? 240 : 0,
          boxSizing: "border-box",
          backgroundColor: "#2a2a2a;",  // Sidebar Background
          color: "#D9D9D9",
          top: "64px",  // Prevents overlap with header
        },
      }}
    >
      <List>
        {/* Dashboard */}
        <ListItem 
          button 
          component={NavLink} 
          to="/Dashboard/AdminDashboard" 
          sx={{
    
            color: "#D9D9D9",
            "&:hover": { backgroundColor: "#424242" },  
            "&:hover .MuiListItemText-primary": { fontWeight: "bold" }, // Bold text on hover
            "&.active-link": { backgroundColor: "#1E1E1E", fontWeight: "bold" }
          }}
        >
          <ListItemIcon sx={{ color: "#D9D9D9" }}><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ transition: "font-weight 0.3s ease" }} />
        </ListItem>
        <Divider sx={{ backgroundColor: "#D9D9D9" }} />

        {/* Users */}
        <ListItem 
          button 
          component={NavLink} 
          to="/user" 
          sx={{
            color: "#D9D9D9",
            "&:hover": { backgroundColor: "#424242" },
            "&:hover .MuiListItemText-primary": { fontWeight: "bold" }, 
            "&.active-link": { backgroundColor: "#1E1E1E", fontWeight: "bold" }
          }}
        >
          <ListItemIcon sx={{ color: "#D9D9D9" }}><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Manage Users" sx={{ transition: "font-weight 0.3s ease" }} />
        </ListItem>
        <Divider sx={{ backgroundColor: "#D9D9D9" }} />

        {/* Restaurants */}
        <ListItem 
          button 
          component={NavLink} 
          to="/restaurants" 
          sx={{
            color: "#D9D9D9",
            "&:hover": { backgroundColor: "#424242" },
            "&:hover .MuiListItemText-primary": { fontWeight: "bold" }, 
            "&.active-link": { backgroundColor: "#1E1E1E", fontWeight: "bold" }
          }}
        >
          <ListItemIcon sx={{ color: "#D9D9D9" }}><RestaurantIcon /></ListItemIcon>
          <ListItemText primary="Manage Restaurants" sx={{ transition: "font-weight 0.3s ease" }} />
        </ListItem>

        <Divider sx={{ backgroundColor: "#D9D9D9" }} />

        {/* Settings */}
        <ListItem 
          button 
          component={NavLink} 
          to="/settings" 
          sx={{
            color: "#D9D9D9",
            "&:hover": { backgroundColor: "#424242" },
            "&:hover .MuiListItemText-primary": { fontWeight: "bold" }, 
            "&.active-link": { backgroundColor: "#1E1E1E", fontWeight: "bold" }
          }}
        >
          <ListItemIcon sx={{ color: "#D9D9D9" }}><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" sx={{ transition: "font-weight 0.3s ease" }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;