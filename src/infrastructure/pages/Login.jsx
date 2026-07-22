// src/pages/Login.jsx

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();

  // Links de navegação para o cabeçalho
  const links = [
    {
      titulo: "Contato",
      href: "/contato"
    }
  ];

  /**
   * Função executada quando o formulário realiza o login com sucesso na API
   */
  const handleLoginSucesso = (dadosUsuario) => {
    // Guarda o token ou dados do utilizador na localStorage se necessário
    if (dadosUsuario?.token) {
      localStorage.setItem("@TodoEsporte:token", dadosUsuario.token);
    }
    
    // Redireciona para a página principal após autenticação
    navigate("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* CABEÇALHO DA APLICAÇÃO */}
      <Header
        logo="/logo.png"
        titulo="TODO ESPORTE"
      />

      {/* BARRA DE NAVEGAÇÃO */}
      <Navbar links={links} />

      {/* FORMULÁRIO DE LOGIN COM CALLBACK DE SUCESSO */}
      <LoginForm onSuccess={handleLoginSucesso} />

      {/* INFORMAÇÃO DE AJUDA / ALERTA */}
      <div className="container mb-5">
        <div
          className="alert alert-info text-center"
          role="alert"
        >
          <small>
            Introduza o seu e-mail e palavra-passe cadastrados para aceder à plataforma.
          </small>
        </div>
      </div>

      {/* RODAPÉ */}
      <Footer />

    </div>
  );
}