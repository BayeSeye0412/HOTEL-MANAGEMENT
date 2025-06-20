const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    enum: ['XOF', 'EUR', 'USD'],
    default: 'EUR'
  },
  image: {
    type: String, // URL de l'image
    default: null
  },
  description: {
    type: String,
    trim: true
  },
  amenities: [{
    type: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances de recherche
hotelSchema.index({ name: 'text', address: 'text' });
hotelSchema.index({ email: 1 });
hotelSchema.index({ isActive: 1 });

module.exports = mongoose.model('Hotel', hotelSchema); 