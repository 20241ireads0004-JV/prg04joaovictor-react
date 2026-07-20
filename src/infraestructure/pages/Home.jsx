// pages/Home.jsx

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {

  // LINKS DA NAVBAR
  const links = [
    {
      titulo: "GRUPOS ESPORTIVOS",
      href: "/grupo-esportivo",
    },
    {
      titulo: "LOGIN",
      href: "/login",
    },
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
      <main className="flex-grow-1">

        {/* HERO */}
        <section className="py-5 bg-light">

          <div className="container">

            <div className="row align-items-center">

              {/* TEXTO */}
              <div className="col-lg-6">

                <h1 className="display-4 fw-bold text-primary mb-4">
                  Encontre o grupo esportivo ideal para você.
                </h1>

                <p className="lead text-secondary mb-4">
                  O <strong>TODO ESPORTE</strong> conecta pessoas apaixonadas por
                  esportes a grupos esportivos da sua região. Descubra novos
                  grupos, participe de eventos, conheça atletas e faça parte de
                  uma comunidade que incentiva a prática esportiva.
                </p>

                <div className="d-flex gap-3">

                  <Link
                    to="/grupos-esportivos"
                    className="btn btn-primary btn-lg"
                  >
                    Ver Grupos Esportivos
                  </Link>

                  <Link
                    to="/login"
                    className="btn btn-outline-primary btn-lg"
                  >
                    Entrar
                  </Link>

                </div>

              </div>

              {/* IMAGEM */}
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

        {/* SOBRE */}
        <section className="py-5">

          <div className="container text-center">

            <h2 className="fw-bold text-primary mb-4">
              O que é o TODO ESPORTE?
            </h2>

            <p className="lead text-muted mx-auto" style={{ maxWidth: "900px" }}>
              Nossa plataforma foi criada para facilitar a divulgação de grupos
              esportivos e aproximar pessoas que compartilham a mesma paixão pelo
              esporte. Seja futebol, vôlei, basquete, corrida, ciclismo ou
              qualquer outra modalidade, aqui você encontra grupos organizados e
              pode participar de novas experiências esportivas.
            </p>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}