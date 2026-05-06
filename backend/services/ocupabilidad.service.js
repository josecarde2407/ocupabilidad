const { readExcel } = require("../utils/excel.reader");

const {
    readCapacityConfig,
} = require("../utils/capacity.reader");

function round(value) {
    return Number(value.toFixed(2));
}

function normalizeText(value) {
    return String(value || "")
        .trim()
        .toUpperCase();
}
function normalizeFamily(family) {
    if (family === "Empaque Semielaborados") {
        return "Envases Y Empaques";
    }

    if (family === "Productos En Proceso Interno - Terminado") {
        return "Producto Terminado";
    }

    return family;
}

function normalizeSede(sede) {

    const value =
        normalizeText(sede);

    if (
        value === "LURIN" ||
        value === "LURIN 4"
    ) {
        return "Lurin";
    }

    if (
        value === "DESCARTES" ||
        value === "CALDEROS" ||
        value ===
        "DESCARTES INMOVILIZADO"
    ) {
        return "Descartes";
    }

    if (
        value ===
        "EXTERNO TRANSITO"
    ) {
        return null;
    }

    return sede;
}

function buildCapacityMap(configs) {

    const map = {};

    configs.forEach((item) => {

        const key =
            `${normalizeText(item.sede)}_${normalizeText(item.familia)}`;

        map[key] = item.capacity;
    });

    return map;
}

function groupBySede(rows, capacityMap) {

    const grouped = {};

    rows.forEach((row) => {

        const sede =
            row.Sede || "SIN_SEDE";

        const familia =
            row.Familia ||
            "SIN_FAMILIA";

        const key =
            `${normalizeText(sede)}_${normalizeText(familia)}`;

        const capacity =
            capacityMap[key] || 0;

        if (!grouped[key]) {

            grouped[key] = {
                sede,

                familia,

                pallets: 0,

                cost: 0,

                capacity,
            };
        }

        grouped[key].pallets = round(
            grouped[key].pallets +
            Number(row.NroPal || 0)
        );

        grouped[key].cost = round(
            grouped[key].cost +
            Number(
                row["Costo Total"] || 0
            )
        );
    });

    return Object.values(grouped).map(
        (item) => {

            const occupancy =
                item.capacity > 0
                    ? round(
                        (
                            item.pallets /
                            item.capacity
                        ) * 100
                    )
                    : 0;

            return {

                ...item,

                occupancy,

                status:
                    item.capacity === 0
                        ? "NO_CONFIG"
                        : occupancy >= 100
                            ? "CRITICAL"
                            : occupancy >= 80
                                ? "WARNING"
                                : "OK",
            };
        }
    );
}

function getDashboardData() {

    const allowedFamilies = [

        "Materia Prima",

        "Envases Y Empaques",

        "Producto Terminado",
    ];

    const rows = readExcel()
    .map((row) => ({
        ...row,
        Familia: normalizeFamily(row.Familia),
        Sede: normalizeSede(row.Sede),
    }))
    .filter((row) =>
        allowedFamilies.includes(row.Familia)
    )
    .filter((row) => row.Sede !== null);

    const configs =
        readCapacityConfig();

    const capacityMap =
        buildCapacityMap(configs);

    const totalPallets = round(

        rows.reduce(
            (acc, row) =>
                acc +
                Number(
                    row.NroPal || 0
                ),
            0
        )
    );

    const totalCost = round(

        rows.reduce(
            (acc, row) =>
                acc +
                Number(
                    row["Costo Total"] || 0
                ),
            0
        )
    );

    const bySede = groupBySede(
        rows,
        capacityMap
    );

    return {

        summary: {

            totalPallets,

            totalCost,

            totalRecords:
                rows.length,
        },

        bySede,
        rows,
    };
}

module.exports = {
    getDashboardData,
};