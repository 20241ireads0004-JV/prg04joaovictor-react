// src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";

// PÁGINAS
import Home from "./infraestructure/pages/Home";
import Login from "./infraestructure/pages/Login";
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