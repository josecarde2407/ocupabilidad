import { useState } from "react";
import { createPortal } from "react-dom";

const COLORS = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#06b6d4",
];

export default function OccupancyChart({ data = [] }) {

    const [tooltip, setTooltip] = useState(null);

    const clean = (v) => String(v || "").trim().toUpperCase();

    const grouped = {};

    data.forEach((item) => {

        const sede = clean(item.sede);
        const familia = clean(item.familia);

        if (!grouped[sede]) {
            grouped[sede] = {
                capacity: 0,
                materials: {},
            };
        }

        grouped[sede].capacity += Number(item.capacity || 0);

        if (!grouped[sede].materials[familia]) {
            grouped[sede].materials[familia] = 0;
        }

        grouped[sede].materials[familia] += Number(item.pallets || 0);
    });

    const chartData = Object.entries(grouped).map(([sede, values]) => {

        const total = Math.round(
            Object.values(values.materials)
                .reduce((a, b) => a + b, 0)
        );

        return {
            sede,
            capacity: Math.round(values.capacity),
            total,
            materials: values.materials,
            occupancy: Math.round(
                values.capacity > 0
                    ? (total / values.capacity) * 100
                    : 0
            ),
        };
    });

    const maxValue = Math.max(
        ...chartData.map((x) => x.capacity),
        1
    );

    const BAR_HEIGHT = 200; // Altura máxima de las barras

    const allFamilies = [
        ...new Set(data.map(x => clean(x.familia)))
    ];

    const colorMap = {};
    allFamilies.forEach((f, i) => {
        colorMap[f] = COLORS[i % COLORS.length];
    });

    return (

        <div className="chart-modern">

            <div className="bars-container">

                {chartData.map((item) => (

                    <div
                        key={item.sede}
                        className="bar-card"
                        onMouseMove={(e) => {

                            const offset = 12;

                            const tooltipWidth = 260;
                            const tooltipHeight = 180;

                            const viewportWidth = window.innerWidth;
                            const viewportHeight = window.innerHeight;

                            let x = e.clientX + offset;
                            let y = e.clientY + offset;

                            if (x + tooltipWidth > viewportWidth) {
                                x = e.clientX - tooltipWidth - offset;
                            }

                            if (y + tooltipHeight > viewportHeight) {
                                y = e.clientY - tooltipHeight - offset;
                            }

                            setTooltip({
                                top: y,
                                left: x,
                                sede: item.sede,
                                materials: item.materials,
                                total: item.total,
                            });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                    >

                        <div className="bar-top-info">
                            <strong>
                                {item.occupancy.toFixed(0)}%
                            </strong>
                            <span>ocupación</span>
                        </div>

                        <div className="bar-area">

                            <div className="stack-bar">

                                {Object.entries(item.materials).map(
                                    ([familia, value]) => {

                                        const height =
                                            (value / maxValue) * BAR_HEIGHT;

                                        return (
                                            <div
                                                key={familia}
                                                className="stack-segment"
                                                style={{
                                                    height: `${height}px`,
                                                    background: colorMap[familia],
                                                }}
                                            />
                                        );
                                    }
                                )}

                            </div>

                            <div
                                className="limit-line"
                                style={{
                                    bottom: `${(item.capacity / maxValue) * 320}px`,
                                }}
                            />

                        </div>

                        <div className="bar-footer">
                            <h4>{item.sede}</h4>
                            <p>
                                {Math.round(item.total).toLocaleString("es-PE")}
                                {" / "}
                                {Math.round(item.capacity).toLocaleString("es-PE")}
                            </p>
                        </div>

                    </div>

                ))}

            </div>

            {/* TOOLTIP */}
            {tooltip &&
                createPortal(
                    <div
                        className="chart-tooltip"
                        style={{
                            top: tooltip.top,
                            left: tooltip.left,
                        }}
                    >
                        <strong>{tooltip.sede}</strong>

                        <div className="tooltip-list">
                            {Object.entries(tooltip.materials).map(
                                ([familia, value]) => (
                                    <div key={familia} className="tooltip-item">
                                        <span
                                            className="tooltip-color"
                                            style={{ background: colorMap[familia] }}
                                        />
                                        <span className="tooltip-name">{familia}</span>
                                        <span className="tooltip-value">
                                            {value.toLocaleString("es-PE", {
                                                maximumFractionDigits: 0
                                            })}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="tooltip-total">
                            Total: {tooltip.total.toLocaleString("es-PE", {
                                maximumFractionDigits: 0
                            })}
                        </div>
                    </div>,
                    document.body
                )
            }

            {/* LEYENDA */}
            <div className="chart-legend">

                {Object.entries(colorMap).map(([familia, color]) => (

                    <div key={familia} className="legend-item">

                        <span
                            className="legend-color"
                            style={{ background: color }}
                        />

                        <span className="legend-label">
                            {familia}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}