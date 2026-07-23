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
    esporteNome: "", // Guarda o nome selecionado no <select>
  });

  useEffect(() => {
    // 1. Verifica autenticação do usuário
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      setUsuarioLogado(JSON.parse(usuarioSalvo));
    } else {
      alert("Você precisa estar logado para criar um grupo!");
      navigate("/");
    }

    // 2. Carrega a lista de esportes para preencher o select
    const carregarEsportes = async () => {
      try {
        const lista = await listarEsportes();
        setEsportesDisponiveis(lista);
        if (lista.length > 0) {
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
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const dataAtual = new Date().toISOString().split("T")[0];

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
      alert("Erro ao cadastrar grupo esportivo. Verifique os dados.");
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