import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function EventoEsportivo() {

  const links = [
    { titulo: "Início", href: "/" },
    { titulo: "Grupos", href: "/grupos" }
  ];

  const eventos = [
    {
      id: 1,
      data: "25/07/2026",
      horario: "09:00",
      vagas: 10,
      descricao: "Partida amistosa entre integrantes do grupo.",

      local: {
        nome: "Arena IFBA",
        endereco: "Rua Central, nº 120",
        bairro: "Centro",
        cidade: "Irecê"
      }
    },

    {
      id: 2,
      data: "10/08/2026",
      horario: "18:30",
      vagas: 6,
      descricao: "Treino aberto para novos participantes.",

      local: {
        nome: "Ginásio Municipal",
        endereco: "Av. Brasil, 500",
        bairro: "Copacabana",
        cidade: "Irecê"
      }
    }
  ];

  return (
    <>
      <Header
        logo="/logo.png"
        titulo="Eventos Esportivos"
      />

      <Navbar links={links} />

      <main className="container my-5">

        <h2 className="mb-4">
          Eventos Esportivos
        </h2>

        {eventos.map((evento) => (

          <div className="card shadow mb-4" key={evento.id}>

            <div className="card-body">

              <div className="row">

                <div className="col-md-6">

                  <h5>Evento</h5>

                  <p><strong>Data:</strong> {evento.data}</p>

                  <p><strong>Horário:</strong> {evento.horario}</p>

                  <p><strong>Vagas:</strong> {evento.vagas}</p>

                  <p><strong>Descrição:</strong><br />
                    {evento.descricao}
                  </p>

                </div>

                <div className="col-md-6">

                  <h5>Local</h5>

                  <p><strong>Nome:</strong> {evento.local.nome}</p>

                  <p><strong>Endereço:</strong> {evento.local.endereco}</p>

                  <p><strong>Bairro:</strong> {evento.local.bairro}</p>

                  <p><strong>Cidade:</strong> {evento.local.cidade}</p>

                </div>

              </div>

            </div>

          </div>

        ))}

      </main>

      <Footer />
    </>
  );
}