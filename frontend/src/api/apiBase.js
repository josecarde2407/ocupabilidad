const API_BASE = import.meta.env.VITE_API_URL="https://tu-backend.onrender.com/api/ocupabilidad";

export const api = {
  capacity: `${API_BASE}/capacity`,
  ocupabilidad: `${API_BASE}/ocupabilidad`,
  import: `${API_BASE}/import`,
};
