import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales, createSale, deleteSale } from "../../../redux/features/salesSlice";
import { fetchServices } from "../../../redux/features/servicesSlice";
import { fetchUsers } from "../../../redux/features/clientSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Sales = () => {
  const dispatch = useDispatch();
  const { sales, loading, error } = useSelector((state) => state.sales);
  const { services } = useSelector((state) => state.services);
  const { users, loading: usersLoading } = useSelector((state) => state.users);
  console.log(sales);
  const [open, setOpen] = useState(false);
  const [serviceAmount, setServiceAmount] = useState(0);
  
  const [formData, setFormData] = useState({
    date: "",
    customerId: "",
    serviceId: "",
    quantity: 0,
    status: "pending", // Default status
    totalAmount: 0, // Default total amount
  });

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchServices());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateSale = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createSale(formData));
      dispatch(fetchSales());
      setOpen(false);
    } catch (error) {
      console.error("Error creating sale:", error);
    }
  };

  const handleClientChange = (event) => {
    const customerId = event.target.value;
    setFormData({ ...formData, customerId });
  };

  const handleServiceChange = (event) => {
    const serviceId = event.target.value;
    const selectedService = services.find(service => service._id === serviceId);
    setServiceAmount(selectedService ? selectedService.amount : 0);

    // Update total amount when service changes
    const totalAmount = formData.quantity * (selectedService ? selectedService.amount : 0);
    setFormData({ ...formData, serviceId, totalAmount });
  };

  const handleDelete = async (saleId) => {
    try {
      await dispatch(deleteSale(saleId));
      dispatch(fetchSales());
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value);
    const totalAmount = quantity * serviceAmount;
    setFormData({ ...formData, quantity, totalAmount });
  };

  if (loading || usersLoading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="sales-container">
      <h2>Sales List</h2>

      <TableContainer component={Paper}>
        <Table aria-label="sales table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales &&
              sales.map((sale) => (
                <TableRow key={sale._id}>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.customerId.name}</TableCell>
                  <TableCell>{sale.serviceId.name}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>{sale.totalAmount}</TableCell>
                  <TableCell>{sale.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(sale._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ marginTop: "20px" }}
      >
        Create Sale
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Sale</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details to create a new sale.
          </DialogContentText>
          <form onSubmit={handleCreateSale}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Customer"
              name="customerId"
              value={formData.customerId}
              onChange={handleClientChange}
              required
              fullWidth
              margin="normal"
            >
              {users.map((client) => (
                <MenuItem key={client._id} value={client._id}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Service"
              name="serviceId"
              value={formData.serviceId}
              onChange={handleServiceChange}
              required
              fullWidth
              margin="normal"
            >
              {services.map((service) => (
                <MenuItem key={service._id} value={service._id}>
                  {service.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="number"
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleQuantityChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              required
              fullWidth
              margin="normal"
            >
              {["pending", "completed", "cancelled"].map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="subtitle1" gutterBottom>
              Total Amount: {formData.totalAmount}
            </Typography>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sales;
