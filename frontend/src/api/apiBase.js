const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = {
  capacity: `${API_BASE}/capacity`,
  ocupabilidad: `${API_BASE}/ocupabilidad`,
  import: `${API_BASE}/import`,
};