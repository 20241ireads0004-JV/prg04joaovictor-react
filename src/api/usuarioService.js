import api from "./api";

export const cadastrarUsuario = async (usuario) => {
    const response = await api.post("/usuarios/save", usuario);
    return response.data;
};

export const listarUsuarios = async () => {
    const response = await api.get("/usuarios/findAll");
    return response.data;
};