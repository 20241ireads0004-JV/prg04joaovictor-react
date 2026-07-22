// src/components/Footer.jsx

import { Link } from "react-router-dom";

/**
 * Componente de Rodapé Reutilizável
 */
export default function Footer() {
  // Obtém o ano atual de forma dinâmica
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <div className="row align-items-center">
          
          {/* SEÇÃO DE LINKS RÁPIDOS */}
          <div className="col-12 mb-3">
            <nav className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/" className="text-white-50 text-decoration-none hover-white">
                Início
              </Link>
              <span className="text-white-50">•</span>
              <Link to="/grupo-esportivo" className="text-white-50 text-decoration-none">
                Grupos Esportivos
              </Link>
            </nav>
          </div>

          {/* DIREITOS RESERVADOS */}
          <div className="col-12">
            <p className="mb-0 text-white-50 fs-7">
              &copy; {anoAtual} - <strong>TODO ESPORTE</strong>. Todos os direitos reservados.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}