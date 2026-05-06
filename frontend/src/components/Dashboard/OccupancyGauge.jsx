// src/components/dashboard/OccupancyGauge.jsx

export default function OccupancyGauge({
    data = [],
}) {

    const totalPallets = data.reduce(
        (acc, item) =>
            acc + Number(item.pallets || 0),
        0
    );

    const totalCapacity = data.reduce(
        (acc, item) =>
            acc + Number(item.capacity || 0),
        0
    );

    const occupancy =
        totalCapacity > 0
            ? (
                (totalPallets /
                    totalCapacity) *
                100
            )
            : 0;

    const occupancyRounded =
        occupancy.toFixed(1);

    const rotation = Math.min(
        (occupancy / 100) * 180,
        180
    );

    const status =
        occupancy >= 95
            ? "critical"
            : occupancy >= 80
                ? "warning"
                : "healthy";

    return (
        <div className="gauge-card">

            <div className="gauge-header">

                <div>
                    <p className="gauge-label">
                        MONITOREO GENERAL
                    </p>

                    <h3 className="gauge-title">
                        Ocupabilidad Total
                    </h3>
                </div>

                <div
                    className={`gauge-status ${status}`}
                >
                    {
                        occupancy >= 95
                            ? "Crítico"
                            : occupancy >= 80
                                ? "Alto"
                                : "Óptimo"
                    }
                </div>

            </div>

            <div className="gauge-wrapper">

                <div className="gauge-track"></div>

                <div
                    className={`gauge-progress ${status}`}
                    style={{
                        background: `conic-gradient(
    from 270deg,
    currentColor 0deg,
    currentColor ${rotation}deg,
    #e2e8f0 ${rotation}deg,
    #e2e8f0 180deg,
    transparent 180deg
)`,
                    }}
                ></div>

                <div className="gauge-inner"></div>

                <div className="gauge-center">

                    <h2>
                        {occupancyRounded}%
                    </h2>

                    <span>
                        ocupación actual
                    </span>

                </div>

            </div>

            <div className="gauge-footer">

                <div className="gauge-metric">

                    <span>Usado</span>

                    <strong>
                        {Math.round(
                            totalPallets
                        ).toLocaleString("es-PE")}
                    </strong>

                </div>

                <div className="gauge-divider"></div>

                <div className="gauge-metric">

                    <span>Capacidad</span>

                    <strong>
                        {Math.round(
                            totalCapacity
                        ).toLocaleString("es-PE")}
                    </strong>

                </div>

            </div>

        </div>
    );
}