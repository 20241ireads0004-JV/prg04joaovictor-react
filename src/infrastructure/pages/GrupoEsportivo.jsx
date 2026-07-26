import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { listarGrupos, aceitarMembro, solicitarEntrada, atualizarGrupo, excluirGrupo } from "../../api/grupoApi";

export default function GrupoEsportivo() {
  const links = [
    { titulo: "INÍCIO", href: "/home" },
    { titulo: "LOGIN", href: "/" }
  ];

  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // ESTADOS PARA CONTROLO DA EDIÇÃO DO GRUPO
  const [grupoEmEdicao, setGrupoEmEdicao] = useState(null); // Guarda o ID do grupo a ser editado
  const [novoNome, setNovoNome] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

  useEffect(() => {
    // Obtém o utilizador logado no localStorage
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      setUsuarioLogado(JSON.parse(usuarioSalvo));
    }
    carregarGrupos();
  }, []);

  // Carrega a lista de grupos da API
  const carregarGrupos = async () => {
    try {
      setLoading(true);
      const dados = await listarGrupos();
      setGrupos(Array.isArray(dados) ? dados : dados?.data?.content || []);
    } catch (erro) {
      console.error("Erro ao carregar grupos:", erro);
    } finally {
      setLoading(false);
    }
  };

  // Prepara os campos de entrada para edição
  const handleIniciarEdicao = (grupo) => {
    setGrupoEmEdicao(grupo.id);
    setNovoNome(grupo.nome);
    setNovaDescricao(grupo.descricao);
  };

  // Cancela o modo de edição
  const handleCancelarEdicao = () => {
    setGrupoEmEdicao(null);
    setNovoNome("");
    setNovaDescricao("");
  };

  // Salva as alterações de Nome e Descrição no backend
  const handleSalvarEdicao = async (grupoId) => {
    if (!novoNome.trim() || !novaDescricao.trim()) {
      alert("Por favor, preencha o nome e a descrição!");
      return;
    }

    try {
      await atualizarGrupo(grupoId, {
        nome: novoNome,
        descricao: novaDescricao
      });
      alert("Grupo atualizado com sucesso!");
      setGrupoEmEdicao(null);
      carregarGrupos(); // Recarrega os grupos para exibir as novidades
    } catch (erro) {
      console.error("Erro ao atualizar grupo:", erro);
      alert("Erro ao atualizar o grupo. Tente novamente.");
    }
  };

  // Exclui o grupo após confirmação
  const handleExcluirGrupo = async (grupoId) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este Grupo Esportivo? Esta ação não pode ser desfeita.");
    
    if (!confirmacao) return;

    try {
      await excluirGrupo(grupoId);
      alert("Grupo excluído com sucesso!");
      carregarGrupos(); // Recarrega a lista sem o grupo excluído
    } catch (erro) {
      console.error("Erro ao excluir grupo:", erro);
      alert("Erro ao excluir o grupo.");
    }
  };

  // Função para o Administrador aceitar um atleta no grupo
  const handleAceitarAtleta = async (grupoId, atletaId) => {
    try {
      await aceitarMembro(grupoId, atletaId);
      alert("Atleta aceito com sucesso no grupo!");
      carregarGrupos();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao aceitar atleta.");
    }
  };

  // Função para um atleta solicitar entrada no grupo
  const handleSolicitarEntrada = async (grupoId) => {
    if (!usuarioLogado) {
      alert("Você precisa estar logado para solicitar entrada!");
      return;
    }
    try {
      await solicitarEntrada(grupoId, usuarioLogado.id);
      alert("Solicitação enviada ao Administrador do grupo!");
    } catch (erro) {
      console.error(erro);
      alert("Erro ao enviar solicitação.");
    }
  };

  return (
    <>
      <Header logo="/logo.png" titulo="TODO ESPORTE" />
      <Navbar links={links} />

      <main className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 text-primary fw-bold">Grupos Esportivos</h2>
          <Link to="/cadastrar-grupo-esportivo" className="btn btn-success btn-lg shadow-sm">
            + Cadastrar Novo Grupo
          </Link>
        </div>

        {loading ? (
          <p className="text-center my-5">Carregando grupos...</p>
        ) : grupos.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            Nenhum grupo cadastrado ainda.
          </div>
        ) : (
          grupos.map((grupo) => {
            // VERIFICAÇÃO: O utilizador logado é o Administrador deste grupo?
            const ehAdmin = usuarioLogado && grupo.administrador?.id === usuarioLogado.id;
            const estaEditando = grupoEmEdicao === grupo.id;

            return (
              <div className="card shadow mb-5" key={grupo.id}>
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  {/* Se estiver a editar, mostra um input para o nome */}
                  {estaEditando ? (
                    <input
                      type="text"
                      className="form-control me-2"
                      value={novoNome}
                      onChange={(e) => setNovoNome(e.target.value)}
                      placeholder="Novo Nome do Grupo"
                    />
                  ) : (
                    <h4 className="mb-0">{grupo.nome}</h4>
                  )}

                  {ehAdmin && (
                    <span className="badge bg-warning text-dark fs-6">
                      Você é o Administrador
                    </span>
                  )}
                </div>

                <div className="card-body">
                  {/* Se estiver a editar, mostra uma caixa de texto para a descrição */}
                  {estaEditando ? (
                    <div className="mb-3">
                      <label className="form-label fw-bold">Descrição:</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={novaDescricao}
                        onChange={(e) => setNovaDescricao(e.target.value)}
                      />
                    </div>
                  ) : (
                    <p><strong>Descrição:</strong> <br />{grupo.descricao}</p>
                  )}

                  <p><strong>Esporte:</strong> <br />{grupo.esporte?.nome || grupo.esporte}</p>
                  <p><strong>Vagas / Jogadores:</strong> <br />{grupo.esporte?.quantidadeJogadores || "N/A"}</p>

                  <hr />

                  {/* SEÇÃO DE ATLETAS E MEMBROS DO GRUPO */}
                  <h5 className="fw-bold mt-4">Membros da Equipe</h5>
                  <div className="row g-3 mb-4">
                    {grupo.membros && grupo.membros.length > 0 ? (
                      grupo.membros.map((atleta) => (
                        <div key={atleta.id} className="col-md-4">
                          <div className="card border-light bg-light p-3">
                            <h6 className="fw-bold mb-1 text-dark">{atleta.nome}</h6>
                            <small className="text-primary fw-bold">
                              ⚽ Equipe: {grupo.nome}
                            </small>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted small">Nenhum atleta membro ainda.</p>
                    )}
                  </div>

                  {/* PAINEL EXCLUSIVO DO ADMINISTRADOR: SOLICITAÇÕES PENDENTES */}
                  {ehAdmin && grupo.solicitacoesPendentes && grupo.solicitacoesPendentes.length > 0 && (
                    <div className="alert alert-warning mt-4">
                      <h6 className="fw-bold">Solicitações de Entrada Pendentes</h6>
                      <ul className="list-group">
                        {grupo.solicitacoesPendentes.map((atleta) => (
                          <li key={atleta.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{atleta.nome}</strong> ({atleta.email})
                            </div>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleAceitarAtleta(grupo.id, atleta.id)}
                            >
                              Aceitar Atleta
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* BOTÕES DE AÇÃO COM RESTRIÇÕES DE ADMINISTRADOR */}
                  <div className="d-flex gap-2 mt-4 flex-wrap">
                    {ehAdmin ? (
                      estaEditando ? (
                        <>
                          {/* Botões exibidos durante a Edição */}
                          <button 
                            className="btn btn-success"
                            onClick={() => handleSalvarEdicao(grupo.id)}
                          >
                            Salvar Alterações
                          </button>
                          <button 
                            className="btn btn-secondary"
                            onClick={handleCancelarEdicao}
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Botão de Editar */}
                          <button 
                            className="btn btn-warning text-white fw-bold"
                            onClick={() => handleIniciarEdicao(grupo)}
                          >
                            Editar Grupo
                          </button>

                          {/* Botão de Excluir */}
                          <button 
                            className="btn btn-danger fw-bold"
                            onClick={() => handleExcluirGrupo(grupo.id)}
                          >
                            Excluir Grupo
                          </button>

                          {/* BOTÃO ADICIONADO: Cadastrar Evento Esportivo */}
                          <Link 
                            to={`/cadastrar-evento-esportivo?grupoId=${grupo.id}`} 
                            className="btn btn-info text-white fw-bold"
                          >
                            + Cadastrar Evento Esportivo
                          </Link>
                        </>
                      )
                    ) : (
                      /* Outros utilizadores podem solicitar entrada */
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => handleSolicitarEntrada(grupo.id)}
                      >
                        Solicitar Entrada
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })
        )}
      </main>

      <Footer />
    </>
  );
}