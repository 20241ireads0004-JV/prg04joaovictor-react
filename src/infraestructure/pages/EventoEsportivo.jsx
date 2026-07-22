import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

import {
    listarEventos
} from "../api/eventoApi";

export default function EventoEsportivo() {

  const links = [
    { titulo: "Início", href: "/" },
    { titulo: "Grupos", href: "/grupos" }
  ];

  const [eventos, setEventos] = useState([]);

  useEffect(() => {

    carregarEventos();

}, []);

const carregarEventos = async () => {

    try {

        const response =
            await listarEventos();

        setEventos(response.data.content);

    }

    catch (erro) {

        console.log(erro);

    }

};
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