import { useState, useRef } from "react";
import ImportPreview from "./ImportPreview";

export default function ImportUploader({ onImport, onPreview, preview }) {

    const [fileName, setFileName] = useState("");

    const inputRef = useRef(null);

    function handleFile(e) {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);

        onPreview(file);
    }

    function onCancel() {
        setFileName("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    function handleReopenClick() {
        // 🔥 clave: permite re-seleccionar mismo archivo
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.click();
        }
    }

    return (
        <div className="settings-card">

            <h2>Importar datos</h2>

            <div className="upload-box">

                <button
                    type="button"
                    className="upload-button"
                    onClick={handleReopenClick}
                >
                    Seleccionar archivo
                </button>

                <input
                    ref={inputRef}
                    type="file"
                    accept=".xlsx,.csv"
                    onChange={handleFile}
                    style={{ display: "none" }}
                />

                <span className="upload-filename">
                    {fileName || "Ningún archivo seleccionado"}
                </span>

            </div>

            {preview && preview.length > 0 && (
                <ImportPreview
                    data={preview}
                    onConfirm={() => onImport(preview)}
                    onCancel={onCancel}
                />
            )}

        </div>
    );
}