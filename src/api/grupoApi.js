import api from "./api";

/**
 * Cadastra um novo grupo esportivo.
 * @param {Object} grupo - Dados do grupo a ser cadastrado.
 */
export const cadastrarGrupo = (grupo) =>
    api.post("/grupos-esportivos/save", grupo);

/**
 * Lista os grupos esportivos com paginação.
 * Retorna diretamente o array contido em 'content'.
 * @param {number} page - Número da página (padrão: 0).
 * @param {number} size - Quantidade de itens por página (padrão: 10).
 */
export const listarGrupos = async (page = 0, size = 10) => {
    const response = await api.get(`/grupos-esportivos/findAll?page=${page}&size=${size}`);
    // Acessa a propriedade 'content' da paginação do Spring
    return response.data?.content || [];
};

/**
 * Busca um grupo esportivo pelo ID.
 * @param {number|string} id - Identificador do grupo.
 */
export const buscarGrupo = (id) =>
    api.get(`/grupos-esportivos/findById/${id}`);

/**
 * Atualiza um grupo esportivo existente.
 * @param {number|string} id - Identificador do grupo.
 * @param {Object} grupo - Novos dados do grupo.
 */
export const atualizarGrupo = (id, grupo) =>
    api.put(`/grupos-esportivos/update/${id}`, grupo);

/**
 * Exclui um grupo esportivo pelo ID.
 * @param {number|string} id - Identificador do grupo.
 */
export const excluirGrupo = (id) =>
    api.delete(`/grupos-esportivos/delete/${id}`);