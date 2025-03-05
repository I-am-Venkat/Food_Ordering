import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Box } from "@mui/material";
import "./AdminDashboard.css";
import Cards from './DashboardCards'
import AddIcon from '@mui/icons-material/Add';

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar is visible by default

  return (
    <Box className="dashboard-container">
      <Header setIsSidebarOpen={setSidebarOpen} />
      <Box className="content-wrapper">
        <Sidebar isOpen={isSidebarOpen} />
        <Box className={`dashboard-content ${isSidebarOpen ? "with-sidebar" : "without-sidebar"}`}>
          <h2 style={{textAlign:"center"}}>"Great service starts with great management!"</h2>
          <p style={{fontWeight:600}}>Admin Dashboard</p>
          <Cards/>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;