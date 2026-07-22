// src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";

// PÁGINAS
import Home from "./infrastructure/pages/Home";
import Login from "./infrastructure/pages/Login";
import GrupoEsportivo from "./infrastructure/pages/GrupoEsportivo";
import EventoEsportivo from "./infrastructure/pages/EventoEsportivo";
import Cadastro from "./infrastructure/pages/Cadastro";

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
          path="/grupo-esportivo"
          element={<GrupoEsportivo />}
        />

        <Route
          path="/evento-esportivo"
          element={<EventoEsportivo />}
        />

        <Route 
        path="/cadastro" 
        element={<Cadastro />} 
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;