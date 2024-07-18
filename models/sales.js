const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
    autopopulate: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },  
});

saleSchema.virtual('customerName', {
  ref: 'User',
  localField: 'customerId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
  options: { select: 'name' }
});

saleSchema.virtual('serviceName', {
  ref: 'Service',
  localField: 'serviceId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
  options: { select: 'name' }
});

saleSchema.set('toObject', { virtuals: true });
saleSchema.set('toJSON', { virtuals: true });

saleSchema.plugin(autopopulate);

module.exports = mongoose.model('Sale', saleSchema);
