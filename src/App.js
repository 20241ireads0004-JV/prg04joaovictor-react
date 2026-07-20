// src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";

// PÁGINAS
import Home from "./infraestructure/pages/Home";
import Login from "./infraestructure/pages/Login";
import AdminPanel from "./infraestructure/pages/AdminPanel";
import Atividade4 from "./infraestructure/pages/Atividade-4";
import GrupoEsportivo from "./infraestructure/pages/GrupoEsportivo";
import EventoEsportivo from "./infraestructure/pages/EventoEsportivo";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={<AdminPanel />}
        />
        
        <Route
          path="/atividade-4"
          element={<Atividade4 />}
        />

        <Route
          path="/grupo-esportivo"
          element={<GrupoEsportivo />}
        />

        <Route
          path="/evento-esportivo"
          element={<EventoEsportivo />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;