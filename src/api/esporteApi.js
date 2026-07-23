// src/api/esporteApi.js

import api from "./api";

/**
 * Cadastra um novo esporte no backend.
 * @param {Object} esporte - Objeto contendo os dados do esporte (ex: nome, quantidadeJogadores).
 * @returns {Promise<Object>} Dados do esporte cadastrado retornado pela API.
 */
export const cadastrarEsporte = async (esporte) => {
  try {
    const response = await api.post("/esportes/save", esporte);
    return response.data;
  } catch (erro) {
    console.error("Erro ao cadastrar esporte:", erro);
    throw erro;
  }
};

/**
 * Lista os esportes cadastrados com suporte a paginação do Spring Boot.
 * Extrai e retorna diretamente o array de esportes contido na propriedade 'content'.
 * @param {number} page - Número da página a consultar (padrão: 0).
 * @param {number} size - Quantidade de itens por página (padrão: 50 para trazer todos no select).
 * @returns {Promise<Array>} Lista de esportes cadastrados.
 */
export const listarEsportes = async (page = 0, size = 50) => {
  try {
    const response = await api.get(`/esportes/findAll?page=${page}&size=${size}`);

    // Tratamento seguro: verifica se o Spring retornou um Page (com .content) ou uma lista direta
    if (response.data && Array.isArray(response.data.content)) {
      return response.data.content;
    } else if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (erro) {
    console.error("Erro ao listar esportes no servidor:", erro);
    throw erro;
  }
};

/**
 * Busca um esporte específico pelo seu ID.
 * @param {number|string} id - Identificador único do esporte.
 * @returns {Promise<Object>} Dados do esporte encontrado.
 */
export const buscarEsporte = async (id) => {
  try {
    const response = await api.get(`/esportes/findById/${id}`);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao buscar esporte com ID ${id}:`, erro);
    throw erro;
  }
};

/**
 * Atualiza os dados de um esporte existente.
 * @param {number|string} id - Identificador do esporte.
 * @param {Object} esporte - Novos dados do esporte a atualizar.
 * @returns {Promise<Object>} Dados do esporte atualizado.
 */
export const atualizarEsporte = async (id, esporte) => {
  try {
    const response = await api.put(`/esportes/update/${id}`, esporte);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao atualizar esporte com ID ${id}:`, erro);
    throw erro;
  }
};

/**
 * Exclui um esporte do sistema pelo seu ID.
 * @param {number|string} id - Identificador do esporte a ser removido.
 * @returns {Promise<Object>} Resposta de confirmação do backend.
 */
export const excluirEsporte = async (id) => {
  try {
    const response = await api.delete(`/esportes/delete/${id}`);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao excluir esporte com ID ${id}:`, erro);
    throw erro;
  }
};