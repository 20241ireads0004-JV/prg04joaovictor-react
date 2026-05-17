// pages/atividade-4.jsx

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Atividade4() {

  // LINKS DA NAVBAR
  const links = [
    {
      titulo: "Home",
      href: "/"
    }
  ];

  // CORES
  const cores = [
    {
      cor: "#1E3A8A",
      texto:
        "🔵 Azul → representa confiança, organização e tecnologia, é muito usado em apps esportivos e ajuda na leitura de dados."
    },
    {
      cor: "#F97316",
      texto:
        "🟠 Laranja → representa ação, energia, movimento e estimula engajamento."
    },
    {
      cor: "#22C55E",
      texto:
        "🟢 Verde → representa recompensa, progresso, vitória e é ideal para feedbacks positivos."
    },
    {
      cor: "#EF4444",
      texto:
        "🔴 Vermelho → representa intensidade, disputa, urgência e é ideal para feedbacks negativos."
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
      <main className="container py-5 flex-grow-1">

        <h1 className="fw-bold text-center mb-5">
          PALETA DE CORES DO PROJETO
        </h1>

        <div className="row g-4">

          {cores.map((item, index) => (

            <div
              className="col-12"
              key={index}
            >

              <div className="card shadow-sm border-0">

                <div className="card-body">

                  <p
                    className="fs-5 fw-semibold mb-0"
                    style={{ color: item.cor }}
                  >
                    {item.texto}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}