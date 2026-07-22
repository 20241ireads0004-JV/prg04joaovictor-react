import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { listarGrupos } from "../../api/grupoApi";

export default function GrupoEsportivo() {
  // Links de navegacao para a barra superior
  const links = [
    { titulo: "INÍCIO", href: "/" },
    { titulo: "LOGIN", href: "/login" }
  ];

  // Estado para armazenar os grupos vindos do backend
  const [grupos, setGrupos] = useState([]);
  // Estado para controlar a mensagem de carregamento
  const [loading, setLoading] = useState(true);

  // Executado assim que a pagina e carregada na tela
  useEffect(() => {
    carregarGrupos();
  }, []);

  // Funcao responsavel por buscar os grupos na API
  const carregarGrupos = async () => {
    try {
      setLoading(true);
      const dados = await listarGrupos();
      // Garante que o retorno seja tratado como um array
      setGrupos(Array.isArray(dados) ? dados : dados?.data?.content || []);
    } catch (erro) {
      console.error("Erro ao carregar grupos:", erro);
      alert("Erro ao carregar grupos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Cabecalho e Barra de Navegacao */}
      <Header logo="/logo.png" titulo="TODO ESPORTE" />
      <Navbar links={links} />

      <main className="container my-5">
        {/* CABEÇALHO DA PÁGINA E BOTÃO PARA CADASTRO */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 text-primary fw-bold">Grupos Esportivos</h2>
          
          {/* Botao de redirecionamento para a nova tela de cadastro */}
          <Link to="/cadastrar-grupo-esportivo" className="btn btn-success btn-lg shadow-sm">
            + Cadastrar Novo Grupo
          </Link>
        </div>

        {/* LISTAGEM DOS GRUPOS */}
        {loading ? (
          <p className="text-center my-5">Carregando grupos...</p>
        ) : grupos.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            Nenhum grupo cadastrado ainda. Clique no botão acima para adicionar o primeiro!
          </div>
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

                {/* Botoes de acao dos grupos */}
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

      {/* Rodape principal */}
      <Footer />
    </>
  );
}