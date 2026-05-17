// LoginForm.jsx

import { useState } from "react";

export default function LoginForm() {

  // ESTADOS
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDAÇÃO
    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 4) {
      setErro("A senha deve conter no mínimo 4 caracteres.");
      return;
    }

    // LIMPA ERRO
    setErro("");

    // AQUI VOCÊ PODE FAZER A LÓGICA DE LOGIN
    console.log({
      email,
      senha
    });

    alert("Login realizado com sucesso!");
  };

  return (
    <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">

      <div className="w-100">

        <div className="row justify-content-center">

          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">

            <div className="card border-0 shadow-lg">

              <div className="card-body p-5">

                {/* TÍTULO */}
                <h2 className="text-center text-primary fw-bold mb-4">
                  Faça seu Login
                </h2>

                {/* FORMULÁRIO */}
                <form onSubmit={handleSubmit}>

                  {/* EMAIL */}
                  <div className="mb-4">

                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      required
                      placeholder="Digite seu email aqui"
                      title="Digite um e-mail válido"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                  </div>

                  {/* SENHA */}
                  <div className="mb-4">

                    <input
                      type="password"
                      id="senha"
                      className="form-control form-control-lg"
                      required
                      minLength={4}
                      placeholder="Digite sua senha aqui"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />

                  </div>

                  {/* BOTÃO */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 fw-bold"
                  >
                    Entrar
                  </button>

                  {/* MENSAGEM DE ERRO */}
                  {erro && (
                    <p className="text-danger text-center mt-3 mb-0">
                      {erro}
                    </p>
                  )}

                </form>

                {/* LINK PARA HOME */}
                <div className="text-center mt-4">

                  <p className="text-muted mb-2">
                    Não tem conta?
                  </p>

                  <a
                    href="/"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Ir para Home
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}