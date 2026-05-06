const fs = require("fs");
const path = require("path");

function readCapacityConfig() {
  try {

    const filePath = path.join(
      __dirname,
      "../data/capacity.config.json"
    );

    if (!fs.existsSync(filePath)) {
      console.error("❌ capacity.config.json no existe");
      return [];
    }

    const raw = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(raw);

  } catch (error) {

    console.error("❌ ERROR leyendo capacity:", error);

    return [];
  }
}

module.exports = {
  readCapacityConfig,
};