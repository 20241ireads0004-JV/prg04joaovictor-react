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

    // 2. Validação de igualdade das senhas
    if (usuario.senha !== usuario.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    // 3. Processamento do cadastro na API
    try {
      setCarregando(true);

      // Chamada para o serviço de API configurado
      await cadastrarUsuario({
        nome: usuario.nome,
        email: usuario.email,
        login: usuario.email, // O DTO do Spring Boot exige o campo login
        senha: usuario.senha,
        telefone: usuario.telefone,
        status: true, // Define o utilizador como ativo por padrão
      });

      setSucesso("Conta criada com sucesso! A redirecionar para o login...");

      // Aguarda 2 segundos para o utilizador ler a mensagem e redireciona
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("Erro no cadastro:", error);
      // Exibe mensagem amigável retornado pela API ou mensagem genérica
      setErro("Falha ao cadastrar utilizador. Verifique os dados ou tente novamente.");
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
                  placeholder="Telefone"
                  value={usuario.telefone}
                  onChange={handleChange}
                  disabled={carregando}
                />
              </div>

              {/* CAMPO SENHA */}
              <div className="mb-3">
                <input
                  type="password"
                  name="senha"
                  className="form-control form-control-lg"
                  placeholder="Senha"
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
              to="/login"
              className="btn btn-outline-primary w-100 mb-2"
            >
              Fazer Login
            </Link>

            <Link
              to="/"
              className="btn btn-outline-secondary w-100"
            >
              Voltar para Home
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}