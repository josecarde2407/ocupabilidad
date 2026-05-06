import { useEffect, useState } from "react";
import CapacityRow from "./CapacityRow";

export default function CapacityMatrix({ data = [], onSave }) {

    const [original, setOriginal] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const cloned = data.map(d => ({ ...d }));
        setRows(cloned);
        setOriginal(cloned.map(d => ({ ...d })));
    }, [data]);

    const hasChanges = rows.some((row, i) =>
        row.capacity !== original[i]?.capacity
    );

    function handleChange(sede, familia, value) {
        setRows(prev =>
            prev.map(row =>
                row.sede === sede && row.familia === familia
                    ? { ...row, capacity: Number(value) }
                    : row
            )
        );
    }

    async function handleSave() {
        if (!hasChanges) return;

        const ok = confirm("¿Guardar cambios en capacidad?");
        if (!ok) return;

        await onSave(rows);
    }

    return (
        <div className="capacity-matrix">

            <table>
                <thead>
                    <tr>
                        <th>Sede</th>
                        <th>Familia</th>
                        <th>Capacity</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map(row => (
                        <CapacityRow
                            key={`${row.sede}-${row.familia}`}
                            row={row}
                            onChange={(value) =>
                                handleChange(row.sede, row.familia, value)
                            }
                        />
                    ))}
                </tbody>
            </table>

            <button
                onClick={handleSave}
                disabled={!hasChanges}
            >
                Guardar cambios
            </button>

        </div>
    );
}