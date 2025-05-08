import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { FaUsers, FaUtensils, FaShoppingCart } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// Line chart data for orders
const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [80, 100, 90, 120, 105, 95, 140],
      borderColor: "#fff",
      backgroundColor: "rgba(255,255,255,0.3)",
      tension: 0.3,
      fill: true,
      pointRadius: 0,
    },
  ],
};

const Cards = () => {
  const cardStyle = {
    borderRadius: "20px",
    color: "#fff",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    },
  };

  return (
    <Grid container spacing={4} justifyContent="center">
      {/* Total Customers */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            ...cardStyle,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Total Customers
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  1,23,456
                </Typography>
              </Box>
              <FaUsers size={42} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Restaurants */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            ...cardStyle,
            background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Total Restaurants
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  123
                </Typography>
              </Box>
              <FaUtensils size={42} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Today's Orders with chart */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            ...cardStyle,
            background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Today’s Orders
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  333
                </Typography>
              </Box>
              <FaShoppingCart size={42} />
            </Box>

            <Box mt={2}>
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cards;
