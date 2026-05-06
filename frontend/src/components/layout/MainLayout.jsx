import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import { getDashboardData } from "../../api/ocupabilidadApi";

import "../../styles/global.css";

export default function MainLayout() {

    const [data, setData] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const [selectedSedes, setSelectedSedes] = useState([]);
    const [selectedFamilias, setSelectedFamilias] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const response = await getDashboardData();
            setData(response);
        } catch (error) {
            console.error(error);
        }
    }

    const rows = data?.rows || [];

    const normalize = (v) =>
        String(v || "").trim().toUpperCase();

    const sedes = [...new Set(
        rows.map(x => normalize(x.Sede ?? x.sede)).filter(Boolean)
    )];

    const familias = [...new Set(
        rows.map(x => normalize(x.Familia ?? x.familia)).filter(Boolean)
    )];

    function handleClear() {
        setSelectedSedes([]);
        setSelectedFamilias([]);
    }

    return (
        <div className="app-shell">

            {/* NAVBAR CON DATOS REALES */}
            <Navbar
                sedes={sedes}
                familias={familias}
                selectedSedes={selectedSedes}
                selectedFamilias={selectedFamilias}
                setSelectedSedes={setSelectedSedes}
                setSelectedFamilias={setSelectedFamilias}
                onClear={handleClear}
                onRefresh={loadData}
            />

            <Sidebar
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* CONTEXTO COMPARTIDO HACIA DASHBOARD */}
            <main className={`app-main ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
                <Outlet context={{
                    data,
                    selectedSedes,
                    selectedFamilias
                }} />
            </main>

        </div>
    );
}