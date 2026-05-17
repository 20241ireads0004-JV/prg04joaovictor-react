// Navbar.jsx

//Os links de direcionamentos são passados como parâmetros para um array
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
                <a className="nav-link" href={link.href}>
                  {link.titulo}
                </a>
              </li>
            ))}

          </ul>
        </div>
      </div>
    </nav>
  );
}