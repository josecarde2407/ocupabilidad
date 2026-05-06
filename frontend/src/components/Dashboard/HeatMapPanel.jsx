import "../../styles/heatmap.css";

const data = [
    {
        almacen: "LURIN",
        value: 92,
    },
    {
        almacen: "BACKUS",
        value: 74,
    },
    {
        almacen: "PLASTICOS",
        value: 51,
    },
    {
        almacen: "DESCARTES",
        value: 36,
    },
    {
        almacen: "HUACHIPA",
        value: 84,
    },
    {
        almacen: "SJL",
        value: 63,
    },
];

export default function HeatMapPanel() {

    return (
        <div className="heatmap-panel">

            <div className="panel-header">

                <div>

                    <h2>
                        Heatmap de Ocupabilidad
                    </h2>

                    <p>
                        Visualización crítica de capacidad logística
                    </p>

                </div>

            </div>

            <div className="heatmap-grid">

                {
                    data.map((item) => {

                        let status = "low";

                        if (item.value >= 85) {
                            status = "critical";
                        }
                        else if (item.value >= 65) {
                            status = "warning";
                        }

                        return (

                            <div
                                key={item.almacen}
                                className={`heat-card ${status}`}
                            >

                                <div className="heat-overlay"></div>

                                <h3>
                                    {item.almacen}
                                </h3>

                                <span>
                                    {item.value}%
                                </span>

                            </div>

                        );

                    })
                }

            </div>

        </div>
    );
}