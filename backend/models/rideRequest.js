const mongoose = require('mongoose');

const rideRequestSchema = new mongoose.Schema({
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  source: String,
  preferredTimeRange: {
    start: Date,
    end: Date
  },
  matched: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('RideRequest', rideRequestSchema);
