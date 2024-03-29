require("dotenv").config();
const express = require("express");

const app = express();
const helmet = require("helmet");
const cors = require("cors");

const logger = require("./configs/logger");

const { PORT } = process.env;
const port = PORT || 21000;

app.use(helmet());
app.use(express.json());
app.use(cors());

// Import routes
const carData = require("./routes/getCarData");
const rentACar = require("./routes/rentACar");

// Use routes
app.use("/api/cars", carData);
app.use("/api/rentacar", rentACar);

app.get("*", (req, res) => {
  res.status(403).send({
    error: `Method ${req.method} not allowed`
  });
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
