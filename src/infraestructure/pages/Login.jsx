// pages/Login.jsx

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

export default function Login() {

  // LINKS DA NAVBAR
  const links = [
    {
      titulo: "Home",
      href: "/"
    },
    {
      titulo: "Painel Admin",
      href: "/Admin"
    },
    {
      titulo: "Contato",
      href: "/contato"
    }
  ];

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* HEADER */}
      <Header
        logo="/logo.png"
        titulo="TODO ESPORTE"
      />

      {/* NAVBAR */}
      <Navbar links={links} />

      {/* FORMULÁRIO DE LOGIN */}
      <LoginForm />

      {/* ALERTA */}
      <div className="container mb-5">

        <div
          className="alert alert-info text-center"
          role="alert"
        >
          <small>
            Use qualquer email e senha com mínimo 4 caracteres para testar
          </small>
        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}