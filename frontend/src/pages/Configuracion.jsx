import { useEffect, useState } from "react";
import CapacityMatrix from "../components/settings/CapacityMatrix";
import ImportUploader from "../components/settings/ImportUploader";

import {
    getCapacity,
    updateCapacity
} from "../api/capacityApi";

import {
    previewImport,
    applyImport
} from "../api/importApi";

export default function Settings() {

    const [capacity, setCapacity] = useState([]);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        loadCapacity();
    }, []);
    console.log("CAPACITY STATE:", capacity);

    async function loadCapacity() {
        try {
            const data = await getCapacity();

            if (!Array.isArray(data)) {
                console.error("Invalid capacity response:", data);
                setCapacity([]);
                return;
            }

            setCapacity(data);

        } catch (err) {
            console.error(err);
            setCapacity([]);
        }
    }

    async function handleSave(updatedRows) {
        const payload = capacity.map(original => {
            const updated = updatedRows.find(
                u => u.sede === original.sede && u.familia === original.familia
            );

            return updated ? updated : original;
        });

        await updateCapacity(payload);
        await loadCapacity();
    }

    async function handlePreview(file) {
        const res = await previewImport(file);
        setPreview(res.preview);
    }

    async function handleImport(data) {
        await applyImport({ data });
        setPreview(null);
    }
     
    function handleCancelImport() {
        setPreview(null);
    }

    return (
        <div className="settings-page">

            <h2 className="settings-title">Configuración de Capacidad</h2>

            <CapacityMatrix
                data={capacity}
                onSave={handleSave}
            />

            <h2>Importación Excel</h2>

            <ImportUploader
                onPreview={handlePreview}
                onImport={handleImport}
                preview={preview}
                onCancel={handleCancelImport}
            />

        </div>
    );
}