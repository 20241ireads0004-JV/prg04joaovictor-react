// CadastroForm.jsx

import { useState } from "react";
import { Link } from "react-router-dom";

export default function CadastroForm() {

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !usuario.nome ||
      !usuario.email ||
      !usuario.telefone ||
      !usuario.senha ||
      !usuario.confirmarSenha
    ) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (usuario.senha.length < 4) {
      setErro("A senha deve possuir no mínimo 4 caracteres.");
      return;
    }

    if (usuario.senha !== usuario.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");

    // Objeto que será enviado para a API
    const novoUsuario = {
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      senha: usuario.senha,
    };

    console.log(novoUsuario);

    alert("Usuário cadastrado com sucesso!");
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

              <div className="mb-3">
                <input
                  type="text"
                  name="nome"
                  className="form-control form-control-lg"
                  placeholder="Nome completo"
                  value={usuario.nome}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="E-mail"
                  value={usuario.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="tel"
                  name="telefone"
                  className="form-control form-control-lg"
                  placeholder="Telefone"
                  value={usuario.telefone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="senha"
                  className="form-control form-control-lg"
                  placeholder="Senha"
                  value={usuario.senha}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  name="confirmarSenha"
                  className="form-control form-control-lg"
                  placeholder="Confirmar senha"
                  value={usuario.confirmarSenha}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-success btn-lg w-100"
              >
                Cadastrar
              </button>

              {erro && (
                <div className="alert alert-danger mt-3 mb-0">
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