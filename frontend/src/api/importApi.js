const API_URL = import.meta.env.VITE_API_URL;

/**
 * Subir archivo y obtener preview
 */
export async function previewImport(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/import/preview`, {
        method: "POST",
        body: formData
    });

    return res.json();
}

/**
 * Aplicar importación final
 */
export async function applyImport() {
    const res = await fetch(`${API_URL}/import/apply`, {
        method: "POST"
    });

    return res.json();
}