import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Box } from "@mui/material";
import "./AdminDashboard.css";
import Cards from './DashboardCards';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar is visible by default
  const navigate = useNavigate();


  return (
    <Box className="dashboard-container">
      <Header setIsSidebarOpen={setSidebarOpen} />

      {/* Logout button - you can position this better using CSS or move to Header if needed */}
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Tooltip title="Logout">
        
        </Tooltip>
      </Box>

      <Box className="content-wrapper">
        <Sidebar isOpen={isSidebarOpen} />
        <Box className={`dashboard-content ${isSidebarOpen ? "with-sidebar" : "without-sidebar"}`}>
          <h2 style={{ textAlign: "center" }}>"Great service starts with great management!"</h2>
          <p style={{ fontWeight: 600 }}>Admin Dashboard</p>
          <Cards />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
