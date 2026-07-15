import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import logo from "../assets/logo.png";

export default function GrupoEsportivo() {
  const links = [
    { titulo: "Início", href: "/" },
    { titulo: "Grupos", href: "/grupos" },
    { titulo: "Perfil", href: "/perfil" }
  ];

  // Dados fictícios
  const grupos = [
    {
      id: 1,
      nome: "Amigos do Futebol",
      descricao:
        "Grupo criado para reunir atletas aos finais de semana e organizar partidas amistosas.",
      dataCriacao: "12/03/2026",
      esporte: {
        nome: "Futebol",
        descricao: "Esporte coletivo disputado entre duas equipes.",
        quantidadeJogadores: 11,
      },
      campeonato: true,
    },
    {
      id: 2,
      nome: "Basquete IFBA",
      descricao:
        "Grupo destinado à prática e treinamento de basquete.",
      dataCriacao: "22/04/2026",
      esporte: {
        nome: "Basquete",
        descricao: "Esporte coletivo disputado em quadra.",
        quantidadeJogadores: 5,
      },
      campeonato: false,
    },
  ];

  return (
    <>
      <Header
        logo={logo}
        titulo="TODO ESPORTE - Grupos Esportivos"
      />

      <Navbar links={links} />

      <main className="container my-5">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Grupos Esportivos</h2>

          <button className="btn btn-success">
            Cadastrar Grupo Esportivo
          </button>
        </div>

        {grupos.map((grupo) => (
          <div className="card shadow mb-4" key={grupo.id}>

            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">{grupo.nome}</h4>
            </div>

            <div className="card-body">

              <div className="row">

                <div className="col-md-6">
                  <h5>Grupo</h5>

                  <p>
                    <strong>Descrição:</strong><br />
                    {grupo.descricao}
                  </p>

                  <p>
                    <strong>Data de criação:</strong><br />
                    {grupo.dataCriacao}
                  </p>
                </div>

                <div className="col-md-6">

                  <h5>Esporte</h5>

                  <p>
                    <strong>Nome:</strong><br />
                    {grupo.esporte.nome}
                  </p>

                  <p>
                    <strong>Descrição:</strong><br />
                    {grupo.esporte.descricao}
                  </p>

                  <p>
                    <strong>Quantidade de jogadores:</strong><br />
                    {grupo.esporte.quantidadeJogadores}
                  </p>

                </div>

              </div>

              <hr />

              <div className="d-flex gap-3 flex-wrap">

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    (window.location.href = "/evento-esportivo")
                  }
                >
                  Evento Esportivo
                </button>

                {grupo.campeonato && (
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      (window.location.href = "/campeonato")
                    }
                  >
                    Campeonato
                  </button>
                )}

              </div>

            </div>

          </div>
        ))}

      </main>

      <Footer />
    </>
  );
}