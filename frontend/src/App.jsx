import { Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Configuracion";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./styles/global.css";


function App() {
    return (
        <PrimeReactProvider>
            <Routes>
                <Route element={<MainLayout />}>

                    <Route path="/" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />

                </Route>
            </Routes>
        </PrimeReactProvider>
    );
}

export default App;