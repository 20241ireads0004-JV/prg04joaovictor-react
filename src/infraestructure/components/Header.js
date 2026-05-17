// Header.jsx

//O logo e titulo são passados como parâmetros
export default function Header({ logo, titulo }) {
  return (
    <header className="bg-primary text-white py-3 shadow">
      <div className="container-fluid d-flex align-items-center gap-3">
        
        {/* LOGOTIPO */}
        {logo && (
          <img
            src={logo}
            alt="Logo do projeto"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        )}

        {/* TÍTULO */}
        <h1 className="fs-4 fw-bold m-0">{titulo}</h1>
      </div>
    </header>
  );
}