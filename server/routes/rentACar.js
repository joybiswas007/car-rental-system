const router = require("express").Router();
const logger = require("../configs/logger");
const { Rental } = require("../db/rentalSchema");

router.post("/", async (req, res) => {
  try {
    const {
      pickupDate,
      returnDate,
      rentType,
      firstName,
      lastName,
      email,
      phone,
      carType,
      carName,
      total
    } = req.body;
    const rental = new Rental({
      pickupDate,
      returnDate,
      rentType,
      firstName,
      lastName,
      email,
      phone,
      veichle: {
        veichleType: carType,
        Name: carName
      },
      total
    });
    await rental.save();
    res.status(200).send({ statusCode: 200, message: "ordered successfully" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ statusCode: 500, error: error.message });
  }
});

module.exports = router;
