const Sale = require('../models/sales');

// Create a new sale
const createSale = async (req, res) => {
  const { status, date, customerId, serviceId, quantity, totalAmount, createdBy } = req.body;
  const sale = new Sale({ status, date, customerId, serviceId, quantity, totalAmount, createdBy });
  
  try {
    const newSale = await sale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all sales
const getSales = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user contains the logged-in user details
    const sales = await Sale.find({ createdBy: userId })
      .populate({
        path: 'customerId',
        model: 'User', // Adjust with your actual model name for User
      })
      .populate({
        path: 'serviceId',
        model: 'Service', // Adjust with your actual model name for Service
      });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single sale by ID
const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('customerId').populate('serviceId');
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a sale
const updateSale = async (req, res) => {
  const { status } = req.body; // Only extract the status from the request body
  const { id } = req.params;

  // Ensure that only valid statuses are accepted
  const validStatuses = ['pending', 'confirmed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    // Find the sale and update only the status field
    const updatedSale = await Sale.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.json(updatedSale);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a sale
const deleteSale = async (req, res) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);
    if (!deletedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.json({ message: 'Sale deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};
