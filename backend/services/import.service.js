const { readExcel } = require("../utils/excel.reader");

let cachedPreview = [];

function previewImport(req, res) {

    const rows = readExcel(req.body.filePath);

    cachedPreview = rows;

    res.json({
        preview: rows.slice(0, 50),
        total: rows.length
    });
}

function applyImport(req, res) {

    if (!cachedPreview.length) {
        return res.status(400).json({
            error: "No preview data"
        });
    }

    // aquí luego conectas a ocupabilidad + capacity update
    res.json({
        message: "Import aplicado",
        rows: cachedPreview.length
    });
}

module.exports = {
    previewImport,
    applyImport
};