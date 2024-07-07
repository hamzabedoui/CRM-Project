import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../../../redux/features/salesSlice";
import { fetchServices } from "../../../redux/features/servicesSlice";
import { fetchPayments } from "../../../redux/features/paymentSlice";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import SalesIcon from "@mui/icons-material/AttachMoney";
import PaymentsIcon from "@mui/icons-material/Payment";
import ServicesIcon from "@mui/icons-material/RoomService";
import "./Home.css"; // Import your CSS file for styling

const Home = () => {
  const dispatch = useDispatch();
  const { sales, loading: salesLoading, error: salesError } = useSelector(
    (state) => state.sales
  );
  const { payments, loading: paymentsLoading, error: paymentsError } = useSelector(
    (state) => state.payments
  );
  const { services, loading: servicesLoading, error: servicesError } = useSelector(
    (state) => state.services
  );

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchPayments());
    dispatch(fetchServices());
  }, [dispatch]);

  if (salesLoading || paymentsLoading || servicesLoading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (salesError || paymentsError || servicesError) {
    return <div className="error-container">Error: {salesError || paymentsError || servicesError}</div>;
  }

  return (
    <div className="home-container">
      <Typography variant="h4" gutterBottom className="dashboard-title">
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card">
            <CardContent className="dashboard-card-content">
              <SalesIcon className="dashboard-icon" />
              <Typography variant="h5" component="h2" className="dashboard-card-title">
                Total Sales
              </Typography>
              <Typography variant="h4" className="dashboard-card-value">
                {sales.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card">
            <CardContent className="dashboard-card-content">
              <PaymentsIcon className="dashboard-icon" />
              <Typography variant="h5" component="h2" className="dashboard-card-title">
                Total Payments
              </Typography>
              <Typography variant="h4" className="dashboard-card-value">
                {payments.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card">
            <CardContent className="dashboard-card-content">
              <ServicesIcon className="dashboard-icon" />
              <Typography variant="h5" component="h2" className="dashboard-card-title">
                Total Services
              </Typography>
              <Typography variant="h4" className="dashboard-card-value">
                {services.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        
      </Grid>

      
      <Typography variant="h5" className="recent-activity-title">
        Recent Activity
      </Typography>
      <Paper elevation={3} className="recent-activity-container">
        {/* Display recent sales or payments in a list or table */}
        <ul className="recent-activity-list">
          {sales.slice(0, 5).map((sale) => (
            <li key={sale._id} className="activity-item">
              {sale.date.split('T')[0]} - {sale.customerId.name} - {sale.serviceId.name} - ${sale.totalAmount}
            </li>
          ))}
        </ul>
      </Paper>
    </div>
  );
};

export default Home;
