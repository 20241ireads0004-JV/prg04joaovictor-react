import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {

  // ESTADOS
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 4) {
      setErro("A senha deve conter no mínimo 4 caracteres.");
      return;
    }

    setErro("");

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

                <h2 className="text-center text-primary fw-bold mb-4">
                  Faça seu Login
                </h2>

                <form onSubmit={handleSubmit}>

                  <div className="mb-4">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Digite seu email aqui"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Digite sua senha aqui"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      minLength={4}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 fw-bold"
                  >
                    Entrar
                  </button>

                  {erro && (
                    <p className="text-danger text-center mt-3 mb-0">
                      {erro}
                    </p>
                  )}

                </form>

                {/* LINKS */}
                <div className="text-center mt-4">

                  <p className="text-muted mb-2">
                    Ainda não possui uma conta?
                  </p>

                  <Link
                    to="/cadastro"
                    className="btn btn-success w-100 mb-3"
                  >
                    Criar Conta
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

          </div>

        </div>

      </div>

    </main>
  );
}