const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  source: String,                   // Node name
  route: [String],                 // Array of node names (NodeA → NodeB → NodeC)
  departureTime: Date,
  seatsAvailable: Number,
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  riders: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pickup: String,  // Rider’s source node
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
