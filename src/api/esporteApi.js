import api from "./api";

/**
 * Cadastra um novo esporte.
 * @param {Object} esporte - Dados do esporte.
 */
export const cadastrarEsporte = (esporte) =>
    api.post("/esportes/save", esporte);

/**
 * Lista os esportes com paginação.
 * Retorna diretamente o array 'content'.
 * @param {number} page - Número da página (padrão: 0).
 * @param {number} size - Quantidade de itens por página (padrão: 10).
 */
export const listarEsportes = async (page = 0, size = 10) => {
    const response = await api.get(`/esportes/findAll?page=${page}&size=${size}`);
    return response.data?.content || [];
};

/**
 * Busca um esporte pelo ID.
 * @param {number|string} id - Identificador do esporte.
 */
export const buscarEsporte = (id) =>
    api.get(`/esportes/findById/${id}`);

/**
 * Atualiza um esporte existente.
 * @param {number|string} id - Identificador do esporte.
 * @param {Object} esporte - Novos dados do esporte.
 */
export const atualizarEsporte = (id, esporte) =>
    api.put(`/esportes/update/${id}`, esporte);

/**
 * Exclui um esporte pelo ID.
 * @param {number|string} id - Identificador do esporte.
 */
export const excluirEsporte = (id) =>
    api.delete(`/esportes/delete/${id}`);