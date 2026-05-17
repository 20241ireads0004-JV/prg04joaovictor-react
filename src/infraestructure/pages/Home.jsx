// pages/Home.jsx

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {

  // LINKS DA NAVBAR
  const links = [
    //Atividade 3 e 5 não estão mais no projeto, deixei somente a atividade 4 para testar o menu
    {
      titulo: "ATIVIDADE 3",
      href: "/atividade-3"
    },
    {
      titulo: "ATIVIDADE 4",
      href: "/Atividade4"
    },
    {
      titulo: "ATIVIDADE 5",
      href: "/atividade-5"
    }
  ];

  // CARDS
  const funcionalidades = [
    {
      titulo: "📋 Campeonatos",
      descricao: "Crie e gerencie campeonatos esportivos com facilidade."
    },
    {
      titulo: "👥 Jogadores",
      descricao: "Cadastre e controle todos os jogadores participantes."
    },
    {
      titulo: "🏆 Resultados",
      descricao: "Registre e acompanhe todos os resultados das partidas."
    }
  ];

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* HEADER */}
      <Header
        logo="/logo.png"
        titulo="TODO ESPORTE"
      />

      {/* NAVBAR */}
      <Navbar links={links} />

      {/* MAIN */}
      <main>

        {/* HERO SECTION */}
        <section className="py-5 bg-light">

          <div className="container">

            <div className="row align-items-center">

              {/* TEXTO */}
              <div className="col-lg-6 mb-4 mb-lg-0">

                <h2 className="display-4 fw-bold text-primary">
                  Bem-vindo ao TODO ESPORTE
                </h2>

                <p className="lead text-muted">
                  Gerencie campeonatos, jogadores e resultados de forma prática e eficiente.
                </p>

                <a
                  href="/login"
                  className="btn btn-primary btn-lg"
                >
                  Acessar Painel
                </a>

              </div>

              {/* IMAGEM */}
              <div className="col-lg-6">

                <img
                  src="/hero.png"
                  alt="Esporte"
                  className="img-fluid rounded"
                />

              </div>

            </div>

          </div>

        </section>

        {/* CARDS */}
        <section className="py-5">

          <div className="container">

            <h3 className="text-center mb-5 fw-bold">
              Funcionalidades Principais
            </h3>

            <div className="row g-4">

              {funcionalidades.map((item, index) => (

                <div
                  className="col-md-6 col-lg-4"
                  key={index}
                >

                  <div className="card border-0 shadow-sm h-100 hover-card">

                    <div className="card-body">

                      <h5 className="card-title text-primary fw-bold">
                        {item.titulo}
                      </h5>

                      <p className="card-text text-muted">
                        {item.descricao}
                      </p>

                      <button
                        className="btn btn-outline-primary"
                      >
                         Saiba mais
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}