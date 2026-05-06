const express = require("express");
const router = express.Router();

const {
    previewImport,
    applyImport
} = require("../services/import.service");

router.post("/preview", previewImport);
router.post("/apply", applyImport);

module.exports = router;