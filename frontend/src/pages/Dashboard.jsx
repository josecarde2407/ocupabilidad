// src/pages/Dashboard.jsx

import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

import SummaryCards from "../components/dashboard/SummaryCards";
import FamilyCards from "../components/dashboard/FamilyCards";
import OccupancyGauge from "../components/dashboard/OccupancyGauge";
import OccupancyChart from "../components/dashboard/OccupancyChart";
import OccupancyTable from "../components/dashboard/OccupancyTable";

export default function Dashboard() {

    const { data, selectedSedes, selectedFamilias } = useOutletContext();

    const [loading, setLoading] = useState(!data);

    useEffect(() => {
        if (data) setLoading(false);
    }, [data]);

    const clean = (v) => String(v || "").trim().toUpperCase();

    const filteredData = useMemo(() => {
        console.log("FILTER CHECK:", {
            selectedSedes,
            selectedFamilias,
            sampleItem: data?.bySede?.[0]
        });

        if (!data?.bySede) return [];

        const sedesSel = selectedSedes.map(clean);
        const familiasSel = selectedFamilias.map(clean);

        return data.bySede.filter((item) => {

            const sede = clean(item?.sede);
            const familia = clean(item?.familia);

            const sedeOk =
                sedesSel.length === 0 || sedesSel.includes(sede);

            const familiaOk =
                familiasSel.length === 0 || familiasSel.includes(familia);

            return sedeOk && familiaOk;
        });

    }, [data, selectedSedes, selectedFamilias]);

    if (loading) {

        return (
            <div className="loading-screen">
                Cargando dashboard...
            </div>
        );
    }

    return (



        <section className="dashboard-main">

            {/* HERO */}
            <div className="hero-sticky">

                <div className="hero-banner">

                    <div className="hero-content">

                        {/* LEFT */}
                        <div className="hero-header">

                            <p className="hero-subtitle">
                                Warehouse Analytics
                            </p>

                            <h1>
                                Panel de Ocupabilidad
                            </h1>

                            <span>
                                Monitoreo logístico y control operativo
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* SUMMARY */}
            <SummaryCards
                summary={data.summary}
            />

            {/* ANALYTICS */}
            <div className="analytics-grid">

                <OccupancyGauge
                    data={filteredData}
                />

                <FamilyCards
                    data={filteredData}
                />

            </div>

            {/* CHART */}
            <div className="panel-card">

                <div className="panel-header">

                    <div>

                        <h2>
                            Ocupabilidad por Almacén
                        </h2>

                        <p>
                            Distribución de pallets y capacidad usada
                        </p>

                    </div>

                </div>

                <OccupancyChart data={filteredData} />

            </div>

            {/* TABLE */}
            <div className="panel-card">

                <div className="panel-header">

                    <div>

                        <h2>
                            Detalle Operacional
                        </h2>

                        <p>
                            Estado detallado de ocupabilidad
                        </p>

                    </div>

                </div>

                <OccupancyTable
                    data={filteredData}
                />

            </div>

        </section>
    );
}