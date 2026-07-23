// src/components/Footer.jsx

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