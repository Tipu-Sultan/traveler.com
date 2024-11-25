const mongoose = require('mongoose');

// State Schema for storing state and associated cities
const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cities: [{ type: String }]  // Array of city names
});

// Create the State model from the schema
const State = mongoose.model('State', stateSchema);

// Export the model
module.exports = State;
