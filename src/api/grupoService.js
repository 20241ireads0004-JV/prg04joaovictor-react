import api from "./api";

export const listarGrupos = async () => {
    const response = await api.get("/grupos-esportivos/findAll");
    return response.data.content;
};

export const cadastrarGrupo = async (grupo) => {
    const response = await api.post("/grupos-esportivos/save", grupo);
    return response.data;
};

export const excluirGrupo = async (id) => {
    await api.delete(`/grupos-esportivos/delete/${id}`);
};

export const editarGrupo = async (id, grupo) => {
    const response = await api.put(`/grupos-esportivos/update/${id}`, grupo);
    return response.data;
};