import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { cadastrarEvento } from "../api/eventoApi";
import { listarLocais, cadastrarLocal } from "../api/localApi";

export default function CadastrarEventoEsportivo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Captura o ID do grupo passado na URL
  const grupoIdParam = searchParams.get("grupoId");

  const links = [
    { titulo: "INÍCIO", href: "/home" },
    { titulo: "GRUPOS", href: "/grupos" },
    { titulo: "LOGIN", href: "/" }
  ];

  // Estado do Evento (EventoEsportivoPostRequestDto)
  const [formData, setFormData] = useState({
    data: "",
    horario: "",
    vagas: 10,
    descricao: "",
    localId: "",
    grupoId: grupoIdParam ? Number(grupoIdParam) : ""
  });

  // Lista de locais carregados da API
  const [locais, setLocais] = useState([]);
  
  // Estado para controlar a exibição do formulário/modal de criação de novo local
  const [mostrarModalLocal, setMostrarModalLocal] = useState(false);
  
  // Estado do Novo Local (LocalPostRequestDto)
  const [novoLocal, setNovoLocal] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    bairro: ""
  });

  const [loading, setLoading] = useState(false);
  const [salvandoLocal, setSalvandoLocal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  // Carrega os locais cadastrados ao carregar a página
  useEffect(() => {
    carregarListaLocais();
  }, []);

  const carregarListaLocais = async () => {
    const dados = await listarLocais();
    setLocais(dados);
    if (dados.length > 0 && !formData.localId) {
      setFormData((prev) => ({ ...prev, localId: dados[0].id }));
    }
  };

  // Atualização dos campos do formulário do Evento
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "vagas" || name === "localId" || name === "grupoId" ? Number(value) : value
    }));
  };

  // Atualização dos campos do formulário de Novo Local
  const handleNovoLocalChange = (e) => {
    const { name, value } = e.target;
    setNovoLocal((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Cadastra um novo local via API e seleciona o ID gerado automaticamente
  const handleSalvarNovoLocal = async (e) => {
    e.preventDefault();
    try {
      setSalvandoLocal(true);
      
      // Envia o LocalPostRequestDto e recebe o LocalGetResponseDto do backend
      const localCriado = await cadastrarLocal(novoLocal);
      
      alert("Local cadastrado com sucesso!");
      
      // Atualiza a lista de locais na tela
      await carregarListaLocais();

      // Seleciona automaticamente o ID do local recém-criado
      setFormData((prev) => ({
        ...prev,
        localId: localCriado.id
      }));

      // Reseta e fecha o formulário do local
      setNovoLocal({ nome: "", endereco: "", cidade: "", bairro: "" });
      setMostrarModalLocal(false);

    } catch (erro) {
      console.error(erro);
      alert("Erro ao cadastrar novo local. Verifique os limites de caracteres e tente novamente.");
    } finally {
      setSalvandoLocal(false);
    }
  };

  // Submissão do Evento
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro("");

    if (!formData.grupoId) {
      setMensagemErro("Erro: O evento precisa estar associado a um Grupo Esportivo válido.");
      return;
    }

    if (!formData.localId) {
      setMensagemErro("Por favor, selecione ou cadastre um Local para o evento.");
      return;
    }

    if (formData.descricao.length < 5 || formData.descricao.length > 500) {
      setMensagemErro("A descrição deve possuir entre 5 e 500 caracteres.");
      return;
    }

    try {
      setLoading(true);

      const eventoDTO = {
        data: formData.data,
        horario: formData.horario.length === 5 ? `${formData.horario}:00` : formData.horario,
        vagas: formData.vagas,
        descricao: formData.descricao,
        local: formData.localId,
        grupo: formData.grupoId
      };

      await cadastrarEvento(eventoDTO);

      alert("Evento Esportivo cadastrado com sucesso!");
      navigate("/grupos");
    } catch (erro) {
      console.error("Erro ao cadastrar evento:", erro);
      setMensagemErro(
        erro.response?.data?.message || "Falha ao cadastrar o evento. Verifique os dados e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header logo="/logo.png" titulo="TODO ESPORTE" />
      <Navbar links={links} />

      <main className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div className="card shadow border-0 rounded-3">
              
              <div className="card-header bg-primary text-white py-3">
                <h3 className="mb-0 fs-4 text-center fw-bold">
                  Cadastrar Evento Esportivo
                </h3>
              </div>

              <div className="card-body p-4">
                {mensagemErro && (
                  <div className="alert alert-danger text-center mb-4" role="alert">
                    {mensagemErro}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  
                  {/* GRUPO ESPORTIVO */}
                  <div className="mb-3">
                    <label htmlFor="grupoId" className="form-label fw-bold">
                      ID do Grupo Esportivo *
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="grupoId"
                      name="grupoId"
                      value={formData.grupoId}
                      onChange={handleChange}
                      required
                      readOnly={Boolean(grupoIdParam)}
                    />
                  </div>

                  {/* DATA E HORÁRIO */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="data" className="form-label fw-bold">
                        Data do Evento *
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="data"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="horario" className="form-label fw-bold">
                        Horário *
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        id="horario"
                        name="horario"
                        value={formData.horario}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* VAGAS E SELEÇÃO DE LOCAL */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-5">
                      <label htmlFor="vagas" className="form-label fw-bold">
                        Vagas *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="vagas"
                        name="vagas"
                        min="1"
                        max="1000"
                        value={formData.vagas}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* CAMPO DE SELEÇÃO E CRIAÇÃO DE LOCAL */}
                    <div className="col-md-7">
                      <label htmlFor="localId" className="form-label fw-bold">
                        Local do Evento *
                      </label>
                      <div className="d-flex gap-2">
                        <select
                          className="form-select"
                          id="localId"
                          name="localId"
                          value={formData.localId}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Selecione um Local</option>
                          {locais.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                              {loc.nome} ({loc.cidade})
                            </option>
                          ))}
                        </select>

                        {/* BOTÃO PARA ABRIR O FORMULÁRIO DE NOVO LOCAL */}
                        <button
                          type="button"
                          className="btn btn-outline-success text-nowrap"
                          onClick={() => setMostrarModalLocal(true)}
                        >
                          + Novo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* FORMULÁRIO DINÂMICO DE CADASTRO DE NOVO LOCAL */}
                  {mostrarModalLocal && (
                    <div className="card border-success bg-light p-3 mb-4">
                      <h5 className="fw-bold text-success mb-3">Cadastrar Novo Local</h5>
                      <div className="row g-2 mb-2">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do Local (ex: Arena Central)"
                            name="nome"
                            value={novoLocal.nome}
                            onChange={handleNovoLocalChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Endereço (ex: Rua A, Nº 10)"
                            name="endereco"
                            value={novoLocal.endereco}
                            onChange={handleNovoLocalChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="row g-2 mb-3">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Cidade"
                            name="cidade"
                            value={novoLocal.cidade}
                            onChange={handleNovoLocalChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Bairro"
                            name="bairro"
                            value={novoLocal.bairro}
                            onChange={handleNovoLocalChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => setMostrarModalLocal(false)}
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                          onClick={handleSalvarNovoLocal}
                          disabled={salvandoLocal}
                        >
                          {salvandoLocal ? "A salvar..." : "Salvar Local"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* DESCRIÇÃO DO EVENTO */}
                  <div className="mb-4">
                    <label htmlFor="descricao" className="form-label fw-bold">
                      Descrição do Evento *
                    </label>
                    <textarea
                      className="form-control"
                      id="descricao"
                      name="descricao"
                      rows="4"
                      maxLength="500"
                      value={formData.descricao}
                      onChange={handleChange}
                      placeholder="Descreva detalhes do evento..."
                      required
                    ></textarea>
                    <small className="text-muted d-block text-end mt-1">
                      {formData.descricao.length}/500 caracteres
                    </small>
                  </div>

                  {/* BOTÕES DE AÇÃO */}
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/grupos" className="btn btn-secondary">
                      Cancelar
                    </Link>

                    <button
                      type="submit"
                      className="btn btn-success fw-bold px-4"
                      disabled={loading}
                    >
                      {loading ? "A cadastrar..." : "Cadastrar Evento"}
                    </button>
                  </div>

                </form>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}