export default function SummaryCards({ summary }) {
    const cards = [
    {
        title: "Total Pallets",
        value: Math.round(
            summary?.totalPallets || 0
        ).toLocaleString("es-PE"),
        subtitle: "Capacidad ocupada",
        icon: "📦",
    },

    {
        title: "Costo Total",
        value: `S/ ${(
            (summary?.totalCost || 0) / 1_000_000
        ).toFixed(1)}M`,
        subtitle: "Valor valorizado",
        icon: "💰",
    },

    {
        title: "SKU Activos",
        value: Number(
            summary?.totalRecords || 0
        ).toLocaleString("es-PE"),
        subtitle: "Productos monitoreados",
        icon: "🧬",
    },
];

    return (
        <div className="summary-grid">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="metric-card"
                >
                    <div className="metric-top">
                        <span className="metric-icon">
                            {card.icon}
                        </span>
                    </div>

                    <div className="metric-content">
                        <p className="metric-title">
                            {card.title}
                        </p>

                        <h2 className="metric-value">
                            {card.value}
                        </h2>
                    </div>
                </div>
            ))}
        </div>
    );
}