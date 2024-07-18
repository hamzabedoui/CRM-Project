const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  saleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sale',
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer'],
    required: true,
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
