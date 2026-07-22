import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { cadastrarGrupo } from "../../api/grupoApi";

export default function CadastrarGrupoEsportivo() {
  const navigate = useNavigate();

  const links = [
    { titulo: "INÍCIO", href: "/" },
    { titulo: "GRUPOS", href: "/grupo-esportivo" },
    { titulo: "LOGIN", href: "/login" }
  ];

  // Estado do formulario
  const [formulario, setFormulario] = useState({
    nome: "",
    descricao: "",
    esporte: "",
    quantidadeJogadores: ""
  });

  // Atualiza os valores do formulario conforme o utilizador digita
  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  // Envio do formulario para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação basica de campos obrigatorios
    if (
      !formulario.nome ||
      !formulario.descricao ||
      !formulario.esporte ||
      !formulario.quantidadeJogadores
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    // Monta o DTO esperado pelo Spring Boot
    const novoGrupoDTO = {
      nome: formulario.nome,
      descricao: formulario.descricao,
      esporte: {
        nome: formulario.esporte,
        quantidadeJogadores: Number(formulario.quantidadeJogadores)
      }
    };

    try {
      // Envia os dados para a API
      await cadastrarGrupo(novoGrupoDTO);
      alert("Grupo esportivo cadastrado com sucesso!");

      // Redireciona automaticamente de volta para a tela de visualizacao
      navigate("/grupo-esportivo");
    } catch (erro) {
      console.error("Erro ao cadastrar grupo:", erro);
      alert("Erro ao cadastrar grupo esportivo.");
    }
  };

  return (
    <>
      <Header logo="/logo.png" titulo="TODO ESPORTE" />
      <Navbar links={links} />

      <main className="container my-5">
        <div className="card shadow">
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Cadastrar Grupo Esportivo</h3>
            {/* Botao opcional para voltar sem salvar */}
            <Link to="/grupo-esportivo" className="btn btn-outline-light btn-sm">
              Voltar para Grupos
            </Link>
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
                    placeholder="Ex: Amigos do Futebol"
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
                    placeholder="Ex: Futebol, Vôlei, Basquete"
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
                  placeholder="Descreva o grupo, horarios de jogo, local, etc."
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
                    placeholder="Ex: 11"
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-success" type="submit">
                  Cadastrar Grupo
                </button>
                <Link to="/grupo-esportivo" className="btn btn-secondary">
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}