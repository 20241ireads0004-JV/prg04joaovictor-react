import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { cadastrarGrupo } from "../../api/grupoApi";
import { listarEsportes } from "../../api/esporteApi";

export default function CadastrarGrupoEsportivo() {
  const navigate = useNavigate();

  const links = [
    { titulo: "INÍCIO", href: "/home" },
    { titulo: "GRUPOS", href: "/grupo-esportivo" },
    { titulo: "LOGIN", href: "/" }
  ];

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [esportesDisponiveis, setEsportesDisponiveis] = useState([]);

  const [formulario, setFormulario] = useState({
    nome: "",
    descricao: "",
    esporteNome: "", // Armazena o nome exato do esporte selecionado
  });

  useEffect(() => {
    // 1. Verifica se o utilizador está autenticado no localStorage
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    
    if (usuarioSalvo) {
      const usuarioParsed = JSON.parse(usuarioSalvo);
      setUsuarioLogado(usuarioParsed);
    } else {
      alert("Você precisa estar logado para criar um grupo!");
      navigate("/");
      return;
    }

    // 2. Carrega a lista de esportes cadastrados na base de dados
    const carregarEsportes = async () => {
      try {
        const lista = await listarEsportes();
        setEsportesDisponiveis(lista);
        
        // Define o primeiro esporte da lista como selecionado por padrão
        if (lista && lista.length > 0) {
          setFormulario((prev) => ({ ...prev, esporteNome: lista[0].nome }));
        }
      } catch (erro) {
        console.error("Não foi possível carregar a lista de esportes:", erro);
      }
    };

    carregarEsportes();
  }, [navigate]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formulario.nome || !formulario.descricao || !formulario.esporteNome) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!usuarioLogado || !usuarioLogado.id) {
      alert("Erro de autenticação: Utilizador não identificado.");
      return;
    }

    // Prepara o DTO exatamente como esperado pela classe GrupoEsportivoPostRequestDto do Spring
    const dataAtual = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

    const novoGrupoDTO = {
      nome: formulario.nome,
      descricao: formulario.descricao,
      dataCriacao: dataAtual,
      esporteNome: formulario.esporteNome
    };

    try {
      await cadastrarGrupo(novoGrupoDTO, usuarioLogado.id);
      alert("Grupo esportivo cadastrado com sucesso!");
      navigate("/grupo-esportivo");
    } catch (erro) {
      console.error("Erro ao cadastrar grupo:", erro);
      
      // Captura a mensagem original enviada pela API Spring Boot
      const mensagemBackend = erro.response?.data?.message || erro.message || "Erro desconhecido ao cadastrar grupo.";
      alert(`Falha no cadastro: ${mensagemBackend}`);
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
            <Link to="/grupo-esportivo" className="btn btn-outline-light btn-sm">
              Voltar para Grupos
            </Link>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nome do Grupo *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={formulario.nome}
                    onChange={handleChange}
                    placeholder="Ex: Baba do IFBA Superior"
                    required
                  />
                </div>

                {/* Seleção do Esporte via Select Dropdown */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Esporte *</label>
                  <select
                    className="form-select"
                    name="esporteNome"
                    value={formulario.esporteNome}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um esporte...</option>
                    {esportesDisponiveis.map((esporte) => (
                      <option key={esporte.id} value={esporte.nome}>
                        {esporte.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Descrição *</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="descricao"
                  value={formulario.descricao}
                  onChange={handleChange}
                  placeholder="Descreva o grupo..."
                  required
                />
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