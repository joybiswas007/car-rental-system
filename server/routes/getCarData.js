const router = require("express").Router();
const logger = require("../configs/logger");

router.post("/", async (req, res) => {
  try {
    const { CAR_DATA_API: carListApi } = process.env;
    const response = await fetch(carListApi);
    const data = await response.json();
    if (data.status !== "success") {
      return res
        .status(400)
        .send({ statusCode: 400, message: "failed to fetch cars list" });
    }
    return res.status(200).send({ statusCode: 200, data: data.data });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ statusCode: 500, error: error.message });
  }
});

module.exports = router;
