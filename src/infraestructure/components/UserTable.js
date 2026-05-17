// UserTable.jsx

//Os usuários são passados como parâmetro para um array
export default function UserTable({ usuarios }) {

  // CONTADORES
  const totalUsuarios = usuarios.length;

  const usuariosAtivos = usuarios.filter(
    (usuario) => usuario.status === "Ativo"
  ).length;

  const usuariosPendentes = usuarios.filter(
    (usuario) => usuario.status === "Pendente"
  ).length;

  const usuariosInativos = usuarios.filter(
    (usuario) => usuario.status === "Inativo"
  ).length;

  // FUNÇÃO PARA DEFINIR A COR DO BADGE
  const badgeStatus = (status) => {
    switch (status) {
      case "Ativo":
        return "bg-success";

      case "Pendente":
        return "bg-warning text-dark";

      case "Inativo":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  return (
    <main className="container-fluid py-5">

      {/* SEÇÃO DE USUÁRIOS */}
      <div className="row mb-4">
        <div className="col-12">

          <div className="card border-0 shadow-sm">

            {/* HEADER */}
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">
                👥 Gerenciar Usuários
              </h5>

              <button className="btn btn-light btn-sm">
                + Novo Usuário
              </button>
            </div>

            {/* TABELA */}
            <div className="card-body p-0">
              <div className="table-responsive">

                <table className="table table-striped table-hover mb-0">

                  <thead className="table-primary">
                    <tr>
                      <th>#ID</th>
                      <th>Nome</th>
                      <th>E-mail</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>

                  <tbody>

                    {usuarios.map((usuario) => (
                      <tr key={usuario.id}>

                        <td>
                          <strong>{usuario.id}</strong>
                        </td>

                        <td>{usuario.nome}</td>

                        <td>{usuario.email}</td>

                        <td>
                          <span className={`badge ${badgeStatus(usuario.status)}`}>
                            {usuario.status}
                          </span>
                        </td>

                        <td className="d-flex gap-2">
                          <button className="btn btn-warning btn-sm">
                            ✏️ Editar
                          </button>

                          <button className="btn btn-danger btn-sm">
                            🗑️ Excluir
                          </button>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <div className="row mt-5">

        {/* TOTAL */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body text-center">

              <h6 className="text-muted mb-2">
                Total de Usuários
              </h6>

              <h3 className="text-primary fw-bold">
                {totalUsuarios}
              </h3>

            </div>
          </div>
        </div>

        {/* ATIVOS */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body text-center">

              <h6 className="text-muted mb-2">
                Usuários Ativos
              </h6>

              <h3 className="text-success fw-bold">
                {usuariosAtivos}
              </h3>

            </div>
          </div>
        </div>

        {/* PENDENTES */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body text-center">

              <h6 className="text-muted mb-2">
                Pendentes
              </h6>

              <h3 className="text-warning fw-bold">
                {usuariosPendentes}
              </h3>

            </div>
          </div>
        </div>

        {/* INATIVOS */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body text-center">

              <h6 className="text-muted mb-2">
                Inativos
              </h6>

              <h3 className="text-danger fw-bold">
                {usuariosInativos}
              </h3>

            </div>
          </div>
        </div>

      </div>

    </main>
  );
}