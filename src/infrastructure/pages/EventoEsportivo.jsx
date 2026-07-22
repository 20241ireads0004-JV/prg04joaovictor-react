// src/pages/EventoEsportivo.jsx

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { listarEventos } from "../../api/eventoApi";

export default function EventoEsportivo() {
  // Links de navegação para o cabeçalho
  const links = [
    { titulo: "Início", href: "/home" },
    { titulo: "Grupos", href: "/grupos" }
  ];

  // Estados da página
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Executa o carregamento dos eventos assim que a tela é montada
  useEffect(() => {
    carregarEventos();
  }, []);

  /**
   * Busca a lista de eventos esportivos através da API
   */
  const carregarEventos = async () => {
    try {
      setCarregando(true);
      setErro("");

      // A função listarEventos já retorna o Array de eventos diretamente
      const dados = await listarEventos();
      setEventos(dados);
    } catch (err) {
      console.error("Erro ao carregar eventos:", err);
      setErro("Não foi possível carregar os eventos esportivos.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* CABEÇALHO DA PÁGINA */}
      <Header
        logo="/logo.png"
        titulo="Eventos Esportivos"
      />

      {/* BARRA DE NAVEGAÇÃO */}
      <Navbar links={links} />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="container my-5 flex-grow-1">
        <h2 className="mb-4 text-primary fw-bold">
          Eventos Esportivos Cadastrados
        </h2>

        {/* MENSAGEM DE ERRO, SE HOUVER */}
        {erro && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}

        {/* ESTADO DE CARREGAMENTO */}
        {carregando ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">A carregar...</span>
            </div>
            <p className="mt-2 text-muted">A carregar eventos...</p>
          </div>
        ) : eventos.length === 0 ? (
          /* MENSAGEM QUANDO NÃO HÁ EVENTOS */
          <div className="alert alert-info text-center" role="alert">
            Nenhum evento esportivo encontrado no momento.
          </div>
        ) : (
          /* LISTAGEM DOS CARDS DE EVENTOS */
          eventos.map((evento) => (
            <div className="card shadow mb-4" key={evento.id || evento.nome}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <h5 className="card-title text-success fw-bold">
                      {evento.nome || "Evento Esportivo"}
                    </h5>

                    <p className="mb-1">
                      <strong>Data:</strong> {evento.data || "Não informada"}
                    </p>

                    <p className="mb-1">
                      <strong>Horário:</strong> {evento.horario || "Não informado"}
                    </p>

                    <p className="mb-1">
                      <strong>Vagas:</strong> {evento.vagas ?? "N/A"}
                    </p>

                    <p className="mt-2">
                      <strong>Descrição:</strong><br />
                      {evento.descricao || "Sem descrição disponível."}
                    </p>
                  </div>

                  {/* ESPAÇO RESERVADO PARA AÇÕES OU INFORMAÇÕES ADICIONAIS */}
                  <div className="col-md-4 d-flex align-items-center justify-content-end">
                    <button className="btn btn-outline-primary">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      {/* RODAPÉ */}
      <Footer />
    </div>
  );
}