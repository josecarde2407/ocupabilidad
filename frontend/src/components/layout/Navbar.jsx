import "../../styles/global.css";
import FiltersPanel from "../Dashboard/FiltersPanel";

export default function Navbar({
    sedes,
    familias,
    selectedSedes,
    selectedFamilias,
    setSelectedSedes,
    setSelectedFamilias,
    onClear,
    onRefresh
}) {
    return (
        <header className="navbar">

            <div className="navbar-left">
                <div className="navbar-brand">
                    <h1 className="navbar-title">
                        Sistema de Reporteria Almacenes
                    </h1>

                    <p className="navbar-subtitle">
                        Monitoreo logístico y control operativo
                    </p>
                </div>
            </div>

            <div className="navbar-right">

                <FiltersPanel
                    sedes={sedes}
                    familias={familias}
                    selectedSedes={selectedSedes}
                    selectedFamilias={selectedFamilias}
                    setSelectedSedes={setSelectedSedes}
                    setSelectedFamilias={setSelectedFamilias}
                />

                <button className="navbar-action" onClick={onClear}>
                    🧹
                </button>

                <button className="navbar-action" onClick={onRefresh}>
                    🔄
                </button>

            </div>

        </header>
    );
}
