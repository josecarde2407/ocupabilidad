const express = require("express");
const router = express.Router();

const {
  getCapacityConfig,
  updateCapacityConfig
} = require("../services/capacity.service");

router.get("/", async (req, res) => {
    try {
        console.log("➡ GET /api/capacity hit");

        const data = await getCapacityConfig();

        console.log("✔ capacity rows:", data.length);

        res.json(data);

    } catch (err) {
        console.error("CAPACITY ERROR:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

router.put("/", async (req, res) => {
  try {
    console.log("🔥 PUT /capacity BODY:");
    console.log(req.body);

    const data = await updateCapacityConfig(req.body);

    console.log("✅ SAVED DATA:");
    console.log(data);

    res.json(data);

  } catch (err) {
    console.error("CAPACITY ERROR:", err);
    res.status(500).json({ error: "Error updating capacity config" });
  }
});

module.exports = router;