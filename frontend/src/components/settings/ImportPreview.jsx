import { useState, useMemo, useEffect } from "react";

export default function ImportPreview({ data = [], onConfirm, onCancel }) {

    const [page, setPage] = useState(1);
    const pageSize = 10;

    const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

    // 🔥 FIX: reset page cuando cambia data
    useEffect(() => {
        setPage(1);
    }, [data]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [data, page]);

    function nextPage() {
        if (page < totalPages) setPage(page + 1);
    }

    function prevPage() {
        if (page > 1) setPage(page - 1);
    }

    function handleCancel() {
        setPage(1);
        if (onCancel) onCancel();
    }

    return (
        <div className="preview-box">

            <h3>Vista previa</h3>

            <table>
                <thead>
                    <tr>
                        <th>UN</th>
                        <th>Familia</th>
                        <th>Sede</th>
                        <th>WhsName</th>
                        <th>Costo</th>
                        <th>NroPal</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedData.map((row, i) => (
                        <tr key={i}>
                            <td>{row.UN}</td>
                            <td>{row.Familia}</td>
                            <td>{row.Sede}</td>
                            <td>{row.WhsName}</td>
                            <td>{row["Costo Total"]}</td>
                            <td>{row.NroPal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* PAGINATION */}
            {data.length > pageSize && (
                <div className="pagination">

                    <button onClick={prevPage} disabled={page === 1}>
                        Prev
                    </button>

                    <span>
                        Página {page} de {totalPages}
                    </span>

                    <button onClick={nextPage} disabled={page === totalPages}>
                        Next
                    </button>

                </div>
            )}

            {/* ACTIONS */}
            <div className="preview-actions">

                <button className="btn-primary" onClick={onConfirm}>
                    Confirmar importación
                </button>

                <button className="btn-secondary" onClick={handleCancel}>
                    Cancelar
                </button>

            </div>

        </div>
    );
}