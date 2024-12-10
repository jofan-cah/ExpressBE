// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nama: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  qty: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative'],
    default: 0
  }
}, {
  timestamps: true
});

// Optional: Add an index for faster querying
ProductSchema.index({ user: 1 });

module.exports = mongoose.model('Product', ProductSchema);