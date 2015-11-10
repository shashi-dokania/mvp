var mongoose = require('mongoose');

var listingSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  zip: String,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  price: Number
});

module.exports = mongoose.model('listing', listingSchema);
