//backend/utils/excel.reader.js
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

function cleanKey(key) {
  return String(key || "")
    .trim()
    .replace(/\s+/g, " "); // limpia dobles espacios
}

function readExcel() {
  try {
    const filePath = path.join(__dirname, "../data/ocupabilidad.xlsx");

    if (!fs.existsSync(filePath)) {
      console.error("❌ Excel no encontrado:", filePath);
      return [];
    }

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const raw = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: null
    });

    if (!raw || raw.length < 2) return [];

    const headers = raw[0].map(cleanKey);

    return raw.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = row[i];
      });
      return obj;
    });

  } catch (err) {
    console.error("❌ ERROR Excel:", err);
    return [];
  }
}

module.exports = { readExcel };