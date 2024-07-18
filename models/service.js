const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    enum: ['hour', 'project','day','month','year','piece'],
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
