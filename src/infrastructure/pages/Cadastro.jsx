// src/components/CadastroForm.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../api/usuarioApi";

export default function CadastroForm() {
  const navigate = useNavigate();

  // Estado unificado para os campos do formulário
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  // Estados para feedback visual ao utilizador
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Atualiza o estado conforme o utilizador digita em qualquer campo
  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  // Trata a submissão do formulário de cadastro
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpa alertas anteriores
    setErro("");
    setSucesso("");

    // 1. Validação de campos obrigatórios
    if (
      !usuario.nome ||
      !usuario.email ||
      !usuario.telefone ||
      !usuario.senha ||
      !usuario.confirmarSenha
    ) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    // 2. Validação do tamanho do nome (min 3 caracteres)
    if (usuario.nome.trim().length < 3) {
      setErro("O nome deve ter no mínimo 3 caracteres.");
      return;
    }

    // 3. Validação do tamanho da senha (Spring Boot exige entre 8 e 20 caracteres)
    if (usuario.senha.length < 8 || usuario.senha.length > 20) {
      setErro("A senha deve ter entre 8 e 20 caracteres.");
      return;
    }

    // 4. Validação de igualdade das senhas
    if (usuario.senha !== usuario.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    // 5. Validação do padrão do telefone (@Pattern do Java)
    // Aceita formatos como: 74999999999, (74) 99999-9999 ou 7499999-9999
    const regexTelefone = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
    if (!regexTelefone.test(usuario.telefone.trim())) {
      setErro("Formato de telefone inválido. Exemplo: 74999999999 ou (74) 99999-9999.");
      return;
    }

    // 6. Processamento do cadastro na API
    try {
      setCarregando(true);

      // Chamada para o serviço de API configurado
      await cadastrarUsuario({
        nome: usuario.nome.trim(),
        email: usuario.email.trim(),
        login: usuario.email.trim(), // O DTO do Spring Boot exige o campo login
        senha: usuario.senha,
        telefone: usuario.telefone.trim(),
        status: true, // Define o utilizador como ativo por padrão
      });

      setSucesso("Conta criada com sucesso! A redirecionar para o login...");

      // Aguarda 2 segundos para o utilizador ler a mensagem e redireciona
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error("Erro no cadastro:", error);
      
      // Captura mensagem detalhada se o backend responder com estrutura de erro
      if (error.response && error.response.data && error.response.data.message) {
        setErro(`Erro: ${error.response.data.message}`);
      } else {
        setErro("Falha ao cadastrar utilizador. Verifique os dados ou tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-lg border-0">
          <div className="card-body p-5">
            
            <h2 className="text-center text-primary fw-bold mb-4">
              Criar Conta
            </h2>

            <form onSubmit={handleSubmit}>
              
              {/* CAMPO NOME */}
              <div className="mb-3">
                <input
                  type="text"
                  name="nome"
                  className="form-control form-control-lg"
                  placeholder="Nome completo"
                  value={usuario.nome}
                  onChange={handleChange}
                  disabled={carregando}
                />
              </div>

              {/* CAMPO EMAIL */}
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="E-mail"
                  value={usuario.email}
                  onChange={handleChange}
                  disabled={carregando}
                />
              </div>

              {/* CAMPO TELEFONE */}
              <div className="mb-3">
                <input
                  type="tel"
                  name="telefone"
                  className="form-control form-control-lg"
                  placeholder="Telefone (ex: 74999999999)"
                  value={usuario.telefone}
                  onChange={handleChange}
                  disabled={carregando}
                />
                <small className="text-muted ps-1">
                  Ex: 74999999999 ou (74) 99999-9999
                </small>
              </div>

              {/* CAMPO SENHA */}
              <div className="mb-3">
                <input
                  type="password"
                  name="senha"
                  className="form-control form-control-lg"
                  placeholder="Senha (mínimo 8 caracteres)"
                  value={usuario.senha}
                  onChange={handleChange}
                  disabled={carregando}
                />
              </div>

              {/* CAMPO CONFIRMAR SENHA */}
              <div className="mb-4">
                <input
                  type="password"
                  name="confirmarSenha"
                  className="form-control form-control-lg"
                  placeholder="Confirmar senha"
                  value={usuario.confirmarSenha}
                  onChange={handleChange}
                  disabled={carregando}
                />
              </div>

              {/* BOTÃO DE SUBMISSÃO */}
              <button
                type="submit"
                className="btn btn-success btn-lg w-100"
                disabled={carregando}
              >
                {carregando ? "A cadastrar..." : "Cadastrar"}
              </button>

              {/* ALERTAS DE SUCESSO OU ERRO */}
              {sucesso && (
                <div className="alert alert-success mt-3 mb-0 text-center" role="alert">
                  {sucesso}
                </div>
              )}

              {erro && (
                <div className="alert alert-danger mt-3 mb-0 text-center" role="alert">
                  {erro}
                </div>
              )}

            </form>

            <hr />

            <p className="text-center mb-3">
              Já possui uma conta?
            </p>

            <Link
              to="/"
              className="btn btn-outline-primary w-100 mb-2"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}