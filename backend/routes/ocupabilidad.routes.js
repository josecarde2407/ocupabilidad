//backend/routes/ocupabilidad.routes.js
const express = require("express");
const router = express.Router();

const {
  getDashboardData,
} = require("../services/ocupabilidad.service");

router.get("/", (req, res) => {
  try {
    const data = getDashboardData();
    res.json(data);
  } catch (error) {
    console.error("🔥 ERROR REAL BACKEND:");
    console.error(error);

    res.status(500).json({
      error: error.message,
      stack: error.stack, // 👈 CLAVE
    });
  }
});

module.exports = router;