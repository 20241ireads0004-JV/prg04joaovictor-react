import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { listarEventos, deletarEvento, atualizarEvento } from "../../api/eventoApi";

export default function EventoEsportivo() {
  const links = [
    { titulo: "Início", href: "/home" },
    { titulo: "Grupos", href: "/grupo-esportivo" }
  ];

  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [eventoDetalhes, setEventoDetalhes] = useState(null);
  const [eventoEdicao, setEventoEdicao] = useState(null);

  const [formData, setFormData] = useState({
    data: "",
    horario: "",
    vagas: "",
    descricao: ""
  });

  useEffect(() => {
    // 1. Carrega o usuário logado a partir do localStorage
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
    console.log("👤 [DEBUG] Usuário Logado do LocalStorage:", usuarioSalvo);
    setUsuarioLogado(usuarioSalvo);

    carregarEventos();
  }, []);

  const carregarEventos = async () => {
    try {
      setCarregando(true);
      setErro("");
      const dados = await listarEventos();
      const lista = Array.isArray(dados) ? dados : dados?.content || [];
      console.log("⚽ [DEBUG] Lista de Eventos retornada do Backend:", lista);
      setEventos(lista);
    } catch (err) {
      console.error("Erro ao carregar eventos:", err);
      setErro("Não foi possível carregar os eventos esportivos.");
    } finally {
      setCarregando(false);
    }
  };

  /**
   * Validação Ultra-Robusta do Administrador do Grupo
   */
  const ehAdministradorDoGrupo = (evento) => {
    if (!usuarioLogado || !evento?.grupoEsportivo) {
      return false;
    }

    // Tenta capturar o ID e o E-mail do usuário logado
    const idUsuario = usuarioLogado.id || usuarioLogado.usuarioId;
    const emailUsuario = usuarioLogado.email || usuarioLogado.login;

    const grupo = evento.grupoEsportivo;

    // Tenta capturar o ID do Administrador no Objeto do Grupo (várias estruturas possíveis do Spring)
    const idAdmin =
      grupo.administrador?.id ||
      grupo.admin?.id ||
      grupo.administradorId ||
      grupo.adminId;

    // Tenta capturar o E-mail do Administrador
    const emailAdmin =
      grupo.administrador?.email ||
      grupo.admin?.email;

    // Comparação por ID
    if (idUsuario && idAdmin && String(idUsuario) === String(idAdmin)) {
      return true;
    }

    // Comparação por E-mail (fallback de segurança)
    if (emailUsuario && emailAdmin && emailUsuario.toLowerCase() === emailAdmin.toLowerCase()) {
      return true;
    }

    return false;
  };

  const handleExcluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este evento esportivo?")) {
      return;
    }

    try {
      await deletarEvento(id);
      setSucesso("Evento excluído com sucesso!");
      carregarEventos();
    } catch (err) {
      console.error("Erro ao excluir evento:", err);
      setErro("Falha ao excluir o evento. Tente novamente.");
    }
  };

  const handleAbrirEdicao = (evento) => {
    setEventoEdicao(evento);
    setFormData({
      data: evento.data || "",
      horario: evento.horario || "",
      vagas: evento.vagas || "",
      descricao: evento.descricao || ""
    });
  };

  const handleSalvarEdicao = async (e) => {
    e.preventDefault();
    try {
      await atualizarEvento(eventoEdicao.id, {
        ...formData,
        localId: eventoEdicao.local?.id || eventoEdicao.localId,
        grupoId: eventoEdicao.grupoEsportivo?.id || eventoEdicao.grupoId
      });

      setSucesso("Evento atualizado com sucesso!");
      setEventoEdicao(null);
      carregarEventos();
    } catch (err) {
      console.error("Erro ao atualizar evento:", err);
      setErro("Não foi possível atualizar o evento.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header logo="/logo.png" titulo="Eventos Esportivos" />
      <Navbar links={links} />

      <main className="container my-5 flex-grow-1">
        <h2 className="mb-4 text-primary fw-bold">Eventos Esportivos Cadastrados</h2>

        {erro && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {erro}
            <button type="button" className="btn-close" onClick={() => setErro("")}></button>
          </div>
        )}

        {sucesso && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {sucesso}
            <button type="button" className="btn-close" onClick={() => setSucesso("")}></button>
          </div>
        )}

        {carregando ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">A carregar...</span>
            </div>
            <p className="mt-2 text-muted">A carregar eventos...</p>
          </div>
        ) : eventos.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            Nenhum evento esportivo encontrado no momento.
          </div>
        ) : (
          eventos.map((evento) => {
            const isAdmin = ehAdministradorDoGrupo(evento);

            return (
              <div className="card shadow-sm mb-4 border-0" key={evento.id || evento.descricao}>
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h5 className="card-title text-success fw-bold mb-3">
                        {evento.grupoEsportivo?.nome || evento.nome || "Evento Esportivo"}
                      </h5>
                      <p className="mb-1"><strong>Data:</strong> {evento.data || "Não informada"}</p>
                      <p className="mb-1"><strong>Horário:</strong> {evento.horario || "Não informado"}</p>
                      <p className="mb-1"><strong>Vagas Disponíveis:</strong> {evento.vagas ?? "N/A"}</p>
                      <p className="mt-2 text-secondary"><strong>Descrição:</strong> {evento.descricao || "Sem descrição."}</p>
                    </div>

                    <div className="col-md-4 d-flex flex-column gap-2 align-items-md-end justify-content-center mt-3 mt-md-0">
                      <button
                        className="btn btn-outline-primary w-100 w-md-auto"
                        onClick={() => setEventoDetalhes(evento)}
                      >
                        Ver Detalhes
                      </button>

                      {/* BOTÕES DE EDITAR E EXCLUIR */}
                      {isAdmin && (
                        <div className="d-flex gap-2 w-100 w-md-auto">
                          <button
                            className="btn btn-warning btn-sm flex-fill"
                            onClick={() => handleAbrirEdicao(evento)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-danger btn-sm flex-fill"
                            onClick={() => handleExcluir(evento.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* MODAL DETALHES */}
      {eventoDetalhes && (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">Detalhes do Evento Esportivo</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setEventoDetalhes(null)}></button>
              </div>
              <div className="modal-body">
                <h6 className="fw-bold text-primary">Informações Gerais:</h6>
                <p className="mb-1"><strong>Grupo:</strong> {eventoDetalhes.grupoEsportivo?.nome || "N/A"}</p>
                <p className="mb-1"><strong>Data:</strong> {eventoDetalhes.data}</p>
                <p className="mb-1"><strong>Horário:</strong> {eventoDetalhes.horario}</p>
                <p className="mb-1"><strong>Vagas:</strong> {eventoDetalhes.vagas}</p>
                <p className="mb-3"><strong>Descrição:</strong> {eventoDetalhes.descricao}</p>

                <hr />
                <h6 className="fw-bold text-success">📍 Endereço do Local:</h6>
                {eventoDetalhes.local ? (
                  <div className="bg-light p-3 rounded border">
                    <p className="mb-1"><strong>Nome do Local:</strong> {eventoDetalhes.local.nome || "Não informado"}</p>
                    <p className="mb-1"><strong>Rua/Avenida:</strong> {eventoDetalhes.local.rua || eventoDetalhes.local.logradouro || eventoDetalhes.local.endereco || "N/A"}</p>
                    <p className="mb-1"><strong>Bairro:</strong> {eventoDetalhes.local.bairro || "N/A"}</p>
                    <p className="mb-1"><strong>Cidade/UF:</strong> {eventoDetalhes.local.cidade || "N/A"}</p>
                  </div>
                ) : (
                  <p className="text-muted italic">Nenhum endereço cadastrado para este evento.</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEventoDetalhes(null)}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIÇÃO */}
      {eventoEdicao && (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSalvarEdicao}>
                <div className="modal-header bg-warning text-dark">
                  <h5 className="modal-title fw-bold">Editar Evento Esportivo</h5>
                  <button type="button" className="btn-close" onClick={() => setEventoEdicao(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Data:</label>
                    <input type="date" className="form-control" value={formData.data} onChange={(e) => setFormData({ ...formData, data: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Horário:</label>
                    <input type="time" className="form-control" value={formData.horario} onChange={(e) => setFormData({ ...formData, horario: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Vagas:</label>
                    <input type="number" className="form-control" value={formData.vagas} onChange={(e) => setFormData({ ...formData, vagas: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Descrição:</label>
                    <textarea className="form-control" rows="3" value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} required></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEventoEdicao(null)}>Cancelar</button>
                  <button type="submit" className="btn btn-warning fw-bold">Salvar Alterações</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}