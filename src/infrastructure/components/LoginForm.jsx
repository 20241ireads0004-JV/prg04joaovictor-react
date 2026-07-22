import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api/usuarioApi";

export default function LoginForm({ onSuccess }) {
  // ESTADOS DO FORMULÁRIO
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // PROCESSAMENTO DO LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      setCarregando(true);

      // Chamada da API para realizar o login
      const dadosUsuario = await login({
        login: email,
        senha: senha,
      });

      // Se fornecido onSuccess pela pagina mae, notifica sucesso
      if (onSuccess) {
        onSuccess(dadosUsuario);
      } else {
        alert("Login realizado com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao realizar login:", err);
      setErro("E-mail ou senha inválidos. Tente novamente.");
    } finally {
      setCarregando(false);
    }
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
                  
                  {/* CAMPO EMAIL */}
                  <div className="mb-4">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Digite seu email aqui"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={carregando}
                      required
                    />
                  </div>

                  {/* CAMPO SENHA */}
                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Digite sua senha aqui"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      minLength={4}
                      disabled={carregando}
                      required
                    />
                  </div>

                  {/* BOTÃO SUBMIT */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 fw-bold"
                    disabled={carregando}
                  >
                    {carregando ? "A entrar..." : "Entrar"}
                  </button>

                  {/* MENSAGEM DE ERRO */}
                  {erro && (
                    <div className="alert alert-danger mt-3 mb-0 text-center" role="alert">
                      {erro}
                    </div>
                  )}

                </form>

                {/* LINKS DE NAVEGAÇÃO - APENAS CADASTRO */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-2">
                    Ainda não possui uma conta?
                  </p>

                  <Link
                    to="/cadastro"
                    className="btn btn-success w-100"
                  >
                    Criar Conta
                  </Link>

                  {/* NOTA: O botao 'Voltar para Home' foi removido conforme solicitado */}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}