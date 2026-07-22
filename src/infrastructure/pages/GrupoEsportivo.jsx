// pages/GrupoEsportivo.jsx
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { listarGrupos, cadastrarGrupo } from "../../api/grupoApi";

export default function GrupoEsportivo() {
  const links = [
    { titulo: "INÍCIO", href: "/" },
    { titulo: "LOGIN", href: "/login" }
  ];

  // Declaração dos estados no topo do componente
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formulario, setFormulario] = useState({
    nome: "",
    descricao: "",
    esporte: "",
    quantidadeJogadores: ""
  });

  useEffect(() => {
    carregarGrupos();
  }, []);

  // Busca grupos cadastrados na API
  const carregarGrupos = async () => {
    try {
      setLoading(true);
      const dados = await listarGrupos();
      // Garante que dados seja um array caso a API retorne algo diferente
      setGrupos(Array.isArray(dados) ? dados : dados?.data?.content || []);
    } catch (erro) {
      console.error(erro);
      alert("Erro ao carregar grupos.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  // Envio do formulário para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formulario.nome ||
      !formulario.descricao ||
      !formulario.esporte ||
      !formulario.quantidadeJogadores
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoGrupoDTO = {
      nome: formulario.nome,
      descricao: formulario.descricao,
      esporte: {
        nome: formulario.esporte,
        quantidadeJogadores: Number(formulario.quantidadeJogadores)
      }
    };

    try {
      // Integração real com o servidor
      await cadastrarGrupo(novoGrupoDTO);
      alert("Grupo esportivo cadastrado com sucesso!");

      // Limpa o formulário e atualiza a lista de grupos
      setFormulario({
        nome: "",
        descricao: "",
        esporte: "",
        quantidadeJogadores: ""
      });
      carregarGrupos();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao cadastrar grupo esportivo.");
    }
  };

  return (
    <>
      <Header logo="/logo.png" titulo="TODO ESPORTE" />
      <Navbar links={links} />

      <main className="container my-5">
        {/* FORMULÁRIO */}
        <div className="card shadow mb-5">
          <div className="card-header bg-success text-white">
            <h3 className="mb-0">Cadastrar Grupo Esportivo</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nome do Grupo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={formulario.nome}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Esporte</label>
                  <input
                    type="text"
                    className="form-control"
                    name="esporte"
                    value={formulario.esporte}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="descricao"
                  value={formulario.descricao}
                  onChange={handleChange}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Quantidade de Jogadores</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantidadeJogadores"
                    value={formulario.quantidadeJogadores}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button className="btn btn-success" type="submit">
                Cadastrar Grupo
              </button>
            </form>
          </div>
        </div>

        {/* LISTAGEM */}
        <h2 className="mb-4">Grupos Esportivos</h2>

        {loading ? (
          <p className="text-center">Carregando grupos...</p>
        ) : grupos.length === 0 ? (
          <p className="text-muted">Nenhum grupo cadastrado ainda.</p>
        ) : (
          grupos.map((grupo) => (
            <div className="card shadow mb-4" key={grupo.id}>
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">{grupo.nome}</h4>
              </div>
              <div className="card-body">
                <p>
                  <strong>Descrição:</strong>
                  <br />
                  {grupo.descricao}
                </p>
                <p>
                  <strong>Esporte:</strong>
                  <br />
                  {grupo.esporte?.nome || grupo.esporte}
                </p>
                <p>
                  <strong>Quantidade de jogadores:</strong>
                  <br />
                  {grupo.esporte?.quantidadeJogadores || "N/A"}
                </p>

                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-primary">Ver Detalhes</button>
                  <button className="btn btn-warning text-white">Editar</button>
                  <button className="btn btn-danger">Excluir</button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      <Footer />
    </>
  );
}