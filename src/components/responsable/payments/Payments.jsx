import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../../../redux/features/salesSlice";
import {
  createPayment,
  fetchPayments,
  deletePayment,
} from "../../../redux/features/paymentSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Payments.css"; // Import the CSS file for styling

const PaymentSection = () => {
  const [date, setDate] = useState("");
  const [saleId, setSaleId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const {
    sales,
    loading: salesLoading,
    error: salesError,
  } = useSelector((state) => state.sales);
  const {
    payments,
    loading: paymentLoading,
    error: paymentError,
  } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchPayments());
  }, [dispatch]);

  useEffect(() => {
    if (saleId) {
      const sale = sales.find((s) => s._id === saleId);
      setSelectedSale(sale);
    }
    console.log(payments.customerId);
  }, [saleId, sales]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSale) return;

    const payment = {
      saleId,
      date,
      paymentMethod,
    };

    dispatch(createPayment(payment))
      .then(() => {
        setDate("");
        setSaleId("");
        setPaymentMethod("");
        dispatch(fetchPayments()); // Fetch payments again to update the table
        setShowForm(false); // Close the dialog after submission
      })
      .catch((error) => {
        console.error("Error creating payment:", error);
      });
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleDeletePayment = (paymentId) => {
    dispatch(deletePayment(paymentId))
      .then(() => {
        dispatch(fetchPayments()); // Fetch payments again to update the table
      })
      .catch((error) => {
        console.error("Error deleting payment:", error);
      });
  };

  return (
    <div className="payment-section-container">
      <h2>Payments List</h2>
      <TableContainer component={Paper} className="payment-table-container">
        <Table>
          <TableHead className="payments-table-head">
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Sale</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Actions</TableCell> {/* Added Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography
                    variant="body2"
                    className="payment-loading-message"
                  >
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : paymentError ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" className="payment-error-message">
                    {paymentError}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment.date.split('T')[0]}</TableCell>
                  <TableCell>{`${payment.saleId.customerId.name} - ${payment.saleId.totalAmount} - ${payment.saleId.serviceId.name}`}</TableCell>
                  <TableCell>{payment.saleId.totalAmount}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      style={{ backgroundColor: "#f44336", color: "#fff" }}
                      onClick={() => handleDeletePayment(payment._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={handleOpenForm}
        variant="contained"
        color="primary"
        className="add-payment-button-container"
      >
        Add Payment
      </Button>

      <Dialog open={showForm} onClose={handleCloseForm}>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="payment-form-container">
            <FormControl fullWidth className="payment-form-control">
              <InputLabel>Sale</InputLabel>
              <Select
                value={saleId}
                onChange={(e) => setSaleId(e.target.value)}
              >
                {sales.map((sale) => (
                  <MenuItem key={sale._id} value={sale._id}>
                    {`${sale.customerId.name} - ${sale.totalAmount} - ${sale.serviceId.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedSale && (
              <div>
                <Typography variant="body1">
                  Customer: {selectedSale.customerId.name}
                </Typography>
                <Typography variant="body1">
                  Amount: {selectedSale.totalAmount}
                </Typography>
                <Typography variant="body1">
                  Service: {selectedSale.serviceId.name}
                </Typography>
              </div>
            )}
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              className="payment-form-control"
            />
            <FormControl fullWidth className="payment-form-control">
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              </Select>
            </FormControl>
            <div className="payment-form-actions">
              <Button type="submit" variant="contained" color="primary">
                Add Payment
              </Button>
              <Button
                onClick={handleCloseForm}
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {(salesLoading || paymentLoading) && (
        <Typography variant="body2" className="payment-loading-message">
          Loading...
        </Typography>
      )}
      {salesError && (
        <Typography variant="body2" className="payment-error-message">
          {salesError}
        </Typography>
      )}
    </div>
  );
};

export default PaymentSection;
