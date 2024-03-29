const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI);

const Rental = require("./models/rentalModel");

module.exports = { Rental };
