// pages/AdminPanel.jsx

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import UserTable from "../components/UserTable";
import Footer from "../components/Footer";

export default function AdminPanel() {

  // LINKS DA NAVBAR
  const links = [
    {
      titulo: "Home",
      href: "/"
    }
  ];

  // LISTA DE USUÁRIOS
  const usuarios = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@email.com",
      status: "Ativo"
    },
    {
      id: 2,
      nome: "Maria Souza",
      email: "maria@email.com",
      status: "Ativo"
    },
    {
      id: 3,
      nome: "JONATAS & PEDRO",
      email: "carapaunouceesse@email.com",
      status: "Pendente"
    },
    {
      id: 4,
      nome: "JONATAS BOLA DE OURO",
      email: "jboladeouro@email.com",
      status: "Ativo"
    },
    {
      id: 5,
      nome: "JONATAS STEEL",
      email: "jsteel@email.com",
      status: "Inativo"
    }
  ];

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* HEADER */}
      <Header
        logo="/logo.png"
        titulo="Painel Administrativo"
      />

      {/* NAVBAR */}
      <Navbar links={links} />

      {/* TABELA DE USUÁRIOS */}
      <UserTable usuarios={usuarios} />

      {/* FOOTER */}
      <Footer />

    </div>
  );
}