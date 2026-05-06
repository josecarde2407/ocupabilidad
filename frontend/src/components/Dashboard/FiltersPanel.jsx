import { MultiSelect } from "primereact/multiselect";
import { useMemo } from "react";

export default function FiltersPanel({
    sedes = [],
    familias = [],
    selectedSedes = [],
    selectedFamilias = [],
    setSelectedSedes,
    setSelectedFamilias,
}) {

    const normalize = (v) =>
        String(v || "").trim().toUpperCase();

    // ✅ options consistentes
    const sedeOptions = useMemo(() =>
        sedes.map((s) => ({
            label: s,
            value: normalize(s),
        }))
        , [sedes]);

    const familiaOptions = useMemo(() =>
        familias.map((f) => ({
            label: f,
            value: normalize(f),
        }))
        , [familias]);

    // 🔥 FIX CLAVE: asegurar que selected sea mismo formato que value
    const selectedSedesFixed = useMemo(
        () => selectedSedes.map(normalize),
        [selectedSedes]
    );

    const selectedFamiliasFixed = useMemo(
        () => selectedFamilias.map(normalize),
        [selectedFamilias]
    );

    return (
        <div className="filters-panel">

            {/* SEDES */}
            <MultiSelect
                value={selectedSedesFixed}
                options={sedeOptions}
                onChange={(e) => {
                    console.log("RAW EVENT:", e);
                    console.log("VALUE:", e.value);
                    console.log("SELECCION:", e.value);
                    setSelectedSedes([...e.value]);
                }}
                placeholder="--Seleccione--"
                display="chip"
                maxSelectedLabels={2}
                className="custom-multiselect"
                panelClassName="custom-panel"
                filter={false}
            />

            {/* FAMILIAS */}
            <MultiSelect
                value={selectedFamiliasFixed}
                options={familiaOptions}
                onChange={(e) => {
                    console.log("RAW EVENT:", e);
                    console.log("VALUE:", e.value);
                    console.log("FAMILIAS:", e.value);
                    setSelectedFamilias([...e.value]);
                }}
                placeholder="--Seleccione--"
                display="chip"
                maxSelectedLabels={2}
                className="custom-multiselect"
                panelClassName="custom-panel"
                filter={false}
            />

        </div>
    );
}