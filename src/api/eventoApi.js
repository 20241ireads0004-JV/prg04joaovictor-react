import api from "./api";

/**
 * Cadastra um novo evento esportivo.
 * @param {Object} evento - Dados do evento.
 */
export const cadastrarEvento = (evento) =>
    api.post("/eventos-esportivos/save", evento);

/**
 * Lista os eventos esportivos com paginação.
 * Retorna diretamente o array 'content'.
 * @param {number} page - Número da página (padrão: 0).
 * @param {number} size - Quantidade de itens por página (padrão: 10).
 */
export const listarEventos = async (page = 0, size = 10) => {
    const response = await api.get(`/eventos-esportivos/findAll?page=${page}&size=${size}`);
    return response.data?.content || [];
};

/**
 * Busca um evento esportivo pelo ID.
 * @param {number|string} id - Identificador do evento.
 */
export const buscarEvento = (id) =>
    api.get(`/eventos-esportivos/findById/${id}`);

/**
 * Atualiza um evento esportivo existente.
 * @param {number|string} id - Identificador do evento.
 * @param {Object} evento - Novos dados do evento.
 */
export const atualizarEvento = (id, evento) =>
    api.put(`/eventos-esportivos/update/${id}`, evento);

/**
 * Exclui um evento esportivo pelo ID.
 * @param {number|string} id - Identificador do evento.
 */
export const excluirEvento = (id) =>
    api.delete(`/eventos-esportivos/delete/${id}`);