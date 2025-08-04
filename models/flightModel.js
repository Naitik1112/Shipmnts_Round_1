const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  shipment_number: {
    type: Number,
    required: true,
  },
  carrier: {
    type: String,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  flightNumber: {
    type: Number,
    unique: true,
  },
  arrival: {
    type: Date,
  },
  departure: {
    type: Date,
  },
  status : {
    type : String,
    default : "in-transit’"
  }
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
