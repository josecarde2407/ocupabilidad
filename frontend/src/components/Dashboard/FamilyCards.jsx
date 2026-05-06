// src/components/dashboard/FamilyCards.jsx

export default function FamilyCards({
    data = [],
}) {

    const grouped = {};

    data.forEach((item) => {

        if (!grouped[item.familia]) {

            grouped[item.familia] = {
                pallets: 0,
                cost: 0,
            };
        }

        grouped[item.familia].pallets +=
            Number(item.pallets || 0);

        grouped[item.familia].cost +=
            Number(item.cost || 0);
    });

    const colors = [
        "family-purple",
        "family-blue",
        "family-green",
        "family-orange",
        "family-red",
    ];

    const icons = [
        "📦",
        "🧪",
        "🏭",
        "🚚",
        "🧬",
    ];

    return (

        <div className="family-grid">

            {Object.entries(grouped)
                .sort(
                    (
                        a,
                        b
                    ) =>
                        b[1].pallets -
                        a[1].pallets
                )
                .map(
                    (
                        [name, values],
                        index
                    ) => {

                        const occupancyLevel =
                            values.pallets >=
                            5000
                                ? "high"
                                : values.pallets >=
                                  2000
                                ? "medium"
                                : "low";

                        return (

                            <div
                                key={name}
                                className={`family-card ${
                                    colors[
                                        index %
                                            colors.length
                                    ]
                                }`}
                            >

                                {/* TOP */}

                                <div className="family-top">

                                    <div className="family-icon">

                                        {
                                            icons[
                                                index %
                                                    icons.length
                                            ]
                                        }

                                    </div>

                                    <div
                                        className={`family-badge ${occupancyLevel}`}
                                    >
                                        {
                                            occupancyLevel ===
                                            "high"
                                                ? "Alta"
                                                : occupancyLevel ===
                                                  "medium"
                                                ? "Media"
                                                : "Baja"
                                        }
                                    </div>

                                </div>

                                {/* TITLE */}

                                <p className="family-name">
                                    {name}
                                </p>

                                {/* VALUE */}

                                <h2 className="family-value">

                                    {Math.round(
                                        values.pallets
                                    ).toLocaleString(
                                        "es-PE"
                                    )}

                                </h2>

                                <span className="family-label">
                                    pallets almacenados
                                </span>

                                {/* FOOTER */}

                                <div className="family-footer">

                                    <div>

                                        <small>
                                            Valor
                                        </small>

                                        <strong>

                                            S/{" "}

                                            {(
                                                values.cost /
                                                1_000_000
                                            ).toFixed(
                                                1
                                            )}

                                            M

                                        </strong>

                                    </div>

                                    <div>

                                        <small>
                                            Participación
                                        </small>

                                        <strong>

                                            {(
                                                (values.pallets /
                                                    data.reduce(
                                                        (
                                                            acc,
                                                            x
                                                        ) =>
                                                            acc +
                                                            Number(
                                                                x.pallets ||
                                                                    0
                                                            ),
                                                        0
                                                    )) *
                                                100
                                            ).toFixed(
                                                0
                                            )}

                                            %

                                        </strong>

                                    </div>

                                </div>

                            </div>

                        );
                    }
                )}

        </div>

    );
}