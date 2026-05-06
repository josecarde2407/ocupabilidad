import { NavLink } from "react-router-dom";
import logoSmasac from "../../assets/logosmasac.webp";
import "../../styles/layout/sidebar.css";

const menuItems = [
    {
        label: "Dashboard",
        icon: "📊",
        path: "/"
    },
    {
        label: "Inventario",
        icon: "📦",
        path: "/inventory"
    },
    {
        label: "Analytics",
        icon: "📈",
        path: "/analytics"
    },
    {
        label: "Configuración",
        icon: "⚙️",
        path: "/settings"
    },
];

export default function Sidebar({ isCollapsed, onToggle }) {

    return (
        <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>

            {/* HEADER - CLICKEABLE */}
            <div className="sidebar-header">
                <button
                    className="sidebar-brand"
                    onClick={onToggle}
                    title={isCollapsed ? "Expandir" : "Contraer"}
                >

                    <div className="sidebar-logo">
                        <img src={logoSmasac} alt="SMASAC" />
                    </div>

                    {!isCollapsed && (
                        <div className="sidebar-brand-info">
                            <h2>
                                Menu
                            </h2>
                        </div>
                    )}

                </button>
            </div>

            {/* MENU */}
            <nav className="sidebar-menu">

                {menuItems.map((item) => (

                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-item ${isActive ? "active" : ""}`
                        }
                        title={isCollapsed ? item.label : ""}
                    >

                        <div className="sidebar-item-icon">
                            {item.icon}
                        </div>

                        {!isCollapsed && <span>{item.label}</span>}

                    </NavLink>

                ))}

            </nav>

            {/* FOOTER */}
            <div className="sidebar-footer">
                {!isCollapsed && (
                    <button className="sidebar-refresh-btn">
                        Creado JoseDev
                    </button>
                )}
            </div>

        </aside>
    );
}