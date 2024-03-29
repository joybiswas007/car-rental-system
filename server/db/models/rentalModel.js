const mongoose = require("mongoose");
const { schemaOptions } = require("../../configs/schemaOptions");

const rentalSchema = new mongoose.Schema(
  {
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    rentType: {
      type: String,
      enum: ["Hourly", "Daily", "Weekly"],
      required: true
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, require: true, unique: true },
    veichle: {
      veichleType: { type: String, required: true },
      Name: { type: String, required: true }
    },
    total: { type: String, required: true }
  },
  schemaOptions
);

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
