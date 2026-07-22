// components/Navbar.jsx
import { Link } from "react-router-dom";

/**
 * Componente de Navegação
 * @param {Array} links - Array de objetos { titulo: string, href: string }
 */
export default function Navbar({ links }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* BOTÃO MOBILE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {links.map((link, index) => (
              <li className="nav-item" key={index}>
                {/* Alterado de <a> para <Link> para navegação SPA */}
                <Link className="nav-link" to={link.href}>
                  {link.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}