// src/api/eventoApi.js

import api from "./api";

/**
 * Cadastra um novo evento esportivo no backend.
 * @param {Object} eventoDTO - Dados do evento a ser cadastrado (nome, local, dataHora, preco, etc).
 * @returns {Promise<Object>} Dados do evento cadastrado retornado pelo backend.
 */
export const cadastrarEvento = async (eventoDTO) => {
  try {
    const response = await api.post("/eventos-esportivos/save", eventoDTO);
    return response.data;
  } catch (erro) {
    console.error("Erro ao cadastrar evento esportivo:", erro);
    throw erro;
  }
};

/**
 * Lista os eventos esportivos com suporte à paginação do Spring Boot.
 * Extrai diretamente o array de eventos contido em 'content'.
 * @param {number} page - Número da página (padrão: 0).
 * @param {number} size - Quantidade de itens por página (padrão: 10).
 * @returns {Promise<Array>} Array com a lista de eventos esportivos.
 */
export const listarEventos = async (page = 0, size = 10) => {
  try {
    const response = await api.get(`/eventos-esportivos/findAll?page=${page}&size=${size}`);

    // Tratamento seguro para paginação do Spring ou lista direta
    if (response.data && Array.isArray(response.data.content)) {
      return response.data.content;
    } else if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (erro) {
    console.error("Erro ao listar eventos esportivos:", erro);
    throw erro;
  }
};

/**
 * Busca um evento esportivo específico pelo seu ID.
 * @param {number|string} id - Identificador único do evento.
 * @returns {Promise<Object>} Dados do evento encontrado.
 */
export const buscarEvento = async (id) => {
  try {
    const response = await api.get(`/eventos-esportivos/findById/${id}`);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao buscar evento esportivo com ID ${id}:`, erro);
    throw erro;
  }
};

/**
 * Atualiza os dados de um evento esportivo existente.
 * @param {number|string} id - Identificador do evento.
 * @param {Object} eventoDTO - Novos dados do evento.
 * @returns {Promise<Object>} Dados do evento atualizado.
 */
export const atualizarEvento = async (id, eventoDTO) => {
  try {
    const response = await api.put(`/eventos-esportivos/update/${id}`, eventoDTO);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao atualizar evento esportivo com ID ${id}:`, erro);
    throw erro;
  }
};

/**
 * Exclui um evento esportivo do sistema pelo seu ID.
 * @param {number|string} id - Identificador do evento a ser removido.
 * @returns {Promise<Object>} Resposta de confirmação do backend.
 */
export const excluirEvento = async (id) => {
  try {
    const response = await api.delete(`/eventos-esportivos/delete/${id}`);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao excluir evento esportivo com ID ${id}:`, erro);
    throw erro;
  }
};