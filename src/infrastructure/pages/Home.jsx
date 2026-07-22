// src/pages/Home.jsx

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {

  // Links completos da Navbar alinhados às rotas do projeto
  const links = [
    {
      titulo: "GRUPOS ESPORTIVOS",
      href: "/grupo-esportivo",
    },
    {
      titulo: "EVENTOS",
      href: "/evento-esportivo",
    },
    {
      titulo: "LOGIN",
      href: "/login",
    },
    {
      titulo: "CADASTRO",
      href: "/cadastro",
    },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* CABEÇALHO */}
      <Header
        logo="/logo.png"
        titulo="TODO ESPORTE"
      />

      {/* BARRA DE NAVEGAÇÃO */}
      <Navbar links={links} />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-grow-1">

        {/* SEÇÃO HERO */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row align-items-center">

              {/* TEXTO DE APRESENTAÇÃO */}
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold text-primary mb-4">
                  Encontre o grupo esportivo ideal para você.
                </h1>

                <p className="lead text-secondary mb-4">
                  O <strong>TODO ESPORTE</strong> conecta pessoas apaixonadas por
                  esportes a grupos e eventos esportivos da sua região. Descubra novos
                  grupos, participe de partidas, conheça atletas e faça parte de
                  uma comunidade ativa.
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Link
                    to="/grupo-esportivo"
                    className="btn btn-primary btn-lg"
                  >
                    Ver Grupos
                  </Link>

                  <Link
                    to="/evento-esportivo"
                    className="btn btn-success btn-lg"
                  >
                    Ver Eventos
                  </Link>

                  <Link
                    to="/login"
                    className="btn btn-outline-primary btn-lg"
                  >
                    Entrar
                  </Link>
                </div>
              </div>

              {/* IMAGEM EM DESTAQUE */}
              <div className="col-lg-6 text-center mt-5 mt-lg-0">
                <img
                  src="/hero.png"
                  alt="Pessoas praticando esportes"
                  className="img-fluid rounded shadow"
                />
              </div>

            </div>
          </div>
        </section>

        {/* SEÇÃO O QUE É O TODO ESPORTE */}
        <section className="py-5">
          <div className="container text-center">
            <h2 className="fw-bold text-primary mb-4">
              O que é o TODO ESPORTE?
            </h2>

            <p className="lead text-muted mx-auto mb-5" style={{ maxWidth: "900px" }}>
              Nossa plataforma foi criada para facilitar a divulgação de grupos
              esportivos e aproximar pessoas que compartilham a mesma paixão pelo
              esporte. Seja futebol, vôlei, basquete, corrida, ciclismo ou
              qualquer outra modalidade, aqui você encontra grupos organizados e
              pode participar de novas experiências.
            </p>

            {/* CARDS DE DESTAQUE */}
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 shadow-sm border-0 bg-light p-4">
                  <div className="card-body">
                    <h3 className="h4 text-primary fw-bold mb-3">
                      Grupos Esportivos
                    </h3>
                    <p className="text-muted mb-4">
                      Encontre equipes da sua região, acompanhe horários de treinos
                      e junte-se a novos times.
                    </p>
                    <Link to="/grupo-esportivo" className="btn btn-outline-primary">
                      Explorar Grupos
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 shadow-sm border-0 bg-light p-4">
                  <div className="card-body">
                    <h3 className="h4 text-success fw-bold mb-3">
                      Eventos & Torneios
                    </h3>
                    <p className="text-muted mb-4">
                      Fique por dentro dos próximos campeonatos, partidas amistosas e
                      eventos abertos para participação.
                    </p>
                    <Link to="/evento-esportivo" className="btn btn-outline-success">
                      Explorar Eventos
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* BANNER DE CHAMADA PARA CADASTRO */}
        <section className="py-5 bg-primary text-white text-center">
          <div className="container">
            <h2 className="fw-bold mb-3">Quer organizar o seu próprio grupo?</h2>
            <p className="lead mb-4">
              Crie uma conta gratuita agora mesmo e comece a divulgar os seus treinos e eventos!
            </p>
            <Link to="/cadastro" className="btn btn-light btn-lg fw-bold text-primary">
              Criar Conta Gratuita
            </Link>
          </div>
        </section>

      </main>

      {/* RODAPÉ */}
      <Footer />

    </div>
  );
}