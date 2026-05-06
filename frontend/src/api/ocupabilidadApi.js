//frontend/src/api/ocupabilidadApi.js

const API_URL = import.meta.env.VITE_API_URL;

export async function getDashboardData() {

    const res = await fetch(`${API_URL}/ocupabilidad`);

    if (!res.ok) {
        throw new Error("Error cargando dashboard");
    }

    return res.json();
}