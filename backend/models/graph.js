const mongoose = require('mongoose');

const graphSchema = new mongoose.Schema({
  name: { type: String, default: 'mysuru_graph' },
  nodes: [String],
  edges: [{
    from: String,
    to: String,
    weight: Number  // Could be distance or estimated time
  }]
});

module.exports = mongoose.model('Graph', graphSchema);
