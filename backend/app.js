const express = require("express");
const cors = require("cors");

const capacityRoutes = require("./routes/capacity.routes");
const ocupabilidadRoutes = require("./routes/ocupabilidad.routes");
const importRoutes = require("./routes/import.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

app.use("/api/capacity", capacityRoutes);
app.use("/api/ocupabilidad", ocupabilidadRoutes);
app.use("/api/import", importRoutes);

module.exports = app;