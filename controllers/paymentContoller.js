const Payment = require('../models/payment');
const Sale = require('../models/sales')
// Create a new payment
const createPayment = async (req, res) => {
  const { saleId, date, paymentMethod } = req.body;

  try {
    // Fetch the sale details using the saleId
    const sale = await Sale.findById(saleId);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    // Extract customerId and amount from the sale
    const { customerId, totalAmount: amount } = sale;

    // Create a new payment with the fetched details
    const payment = new Payment({ saleId, date, paymentMethod, amount, customerId });

    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate({
      path: 'saleId',
      populate: {
        path: 'serviceId',
        model: 'Service', // Adjust with your actual model name for service
      },
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate({
      path: 'saleId',
      populate: {
        path: 'serviceId',
        model: 'Service', // Adjust with your actual model name for service
      },
    });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPayment = await Payment.findByIdAndDelete(id);
    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  deletePayment,
};
