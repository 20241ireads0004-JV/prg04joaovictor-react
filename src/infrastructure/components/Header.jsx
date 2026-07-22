// src/components/Header.jsx

import { Link } from "react-router-dom";

/**
 * Componente de Cabeçalho Reutilizável
 * 
 * @param {string} logo - Caminho da imagem de logotipo (opcional)
 * @param {string} titulo - Título a ser exibido no cabeçalho (opcional)
 */
export default function Header({ 
  logo = "/logo.png", 
  titulo = "TODO ESPORTE" 
}) {
  return (
    <header className="bg-primary text-white py-3 shadow">
      <div className="container-fluid d-flex align-items-center gap-3">
        
        {/* LINK PARA A HOME AO CLICAR NO LOGO OU TÍTULO */}
        <Link 
          to="/" 
          className="d-flex align-items-center gap-3 text-white text-decoration-none"
        >
          {/* LOGOTIPO */}
          {logo && (
            <img
              src={logo}
              alt={`Logotipo do ${titulo}`}
              className="rounded-circle border border-2 border-white"
              style={{ width: "45px", height: "45px", objectFit: "cover" }}
            />
          )}

          {/* TÍTULO */}
          <h1 className="fs-4 fw-bold m-0">{titulo}</h1>
        </Link>

      </div>
    </header>
  );
}