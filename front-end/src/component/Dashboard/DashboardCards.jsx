import React from "react";
import { Grid,Card, CardContent, Typography } from "@mui/material";
// import Grid from '@mui/material/Grid2'
import "./DashboardCards.css";

const Cards = () => {
  return (
    <Grid container spacing={3} justifyContent="center" >
      <Grid item xs={12} sm={6} md={4}>
        <Card className="animated-card card1" sx={{ borderRadius:"9px"}}>
          <CardContent>
            <Typography variant="h6" >Total Customers</Typography>
            <Typography variant="h4">1,23,456</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid  item xs={12} sm={6} md={4}>
        <Card className="animated-card card2" sx={{ borderRadius:"9px"}}>
          <CardContent>
            <Typography variant="h6">Total Restaurants</Typography>
            <Typography variant="h4">123</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className="animated-card card3" sx={{ borderRadius:"9px"}}>
          <CardContent>
            <Typography variant="h6">Today's Order</Typography>
            <Typography variant="h4">333</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cards;