export const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  

export async function getCapacity() {
    const res = await fetch(`${API_BASE}/capacity`);
    return res.json();
}

export async function updateCapacity(data) {
    const res = await fetch(`${API_BASE}/capacity`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
}