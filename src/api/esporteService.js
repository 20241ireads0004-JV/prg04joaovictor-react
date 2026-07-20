import api from "./api";

export const listarEsportes = async () => {
    const response = await api.get("/esportes/findAll");
    return response.data.content;
};