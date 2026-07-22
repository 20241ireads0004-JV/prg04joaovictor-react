// src/api/grupoApi.js

import api from "./api";

/**
 * Cadastra um novo grupo esportivo no backend.
 * @param {Object} grupo - Objeto contendo os dados do grupo (nome, descricao, esporte, etc).
 * @returns {Promise<Object>} Retorna os dados do grupo cadastrado.
 */
// Cadastrar novo grupo enviando o DTO
export const cadastrarGrupo = async (grupoDTO) => {
  try {
    const response = await api.post("/grupos/save", grupoDTO);
    return response.data;
  } catch (erro) {
    console.error("Erro ao cadastrar grupo:", erro);
    throw erro;
  }
};

// Solicitar entrada em um grupo (Atleta)
export const solicitarEntrada = async (grupoId, usuarioId) => {
  try {
    const response = await api.post(`/grupos/${grupoId}/solicitar`, { usuarioId });
    return response.data;
  } catch (erro) {
    console.error("Erro ao solicitar entrada:", erro);
    throw erro;
  }
};

// Aceitar/Aprovar Atleta no grupo (Apenas Administrador)
export const aceitarMembro = async (grupoId, atletaId) => {
  try {
    const response = await api.post(`/grupos/${grupoId}/aceitar-membro`, { atletaId });
    return response.data;
  } catch (erro) {
    console.error("Erro ao aceitar membro:", erro);
    throw erro;
  }
};

/**
 * Lista os grupos esportivos com paginação do Spring Boot.
 * Extrai e retorna diretamente o array contido na propriedade 'content'.
 * @param {number} page - Número da página desejada (padrão: 0).
 * @param {number} size - Quantidade de itens por página (padrão: 10).
 * @returns {Promise<Array>} Array com a lista de grupos.
 */
export const listarGrupos = async (page = 0, size = 10) => {
  try {
    const response = await api.get(`/grupos-esportivos/findAll?page=${page}&size=${size}`);
    
    // Tratamento seguro: se o Spring retornar um Page, acessa 'content'. 
    // Se retornar uma lista direta, usa 'data'. Se falhar, retorna [].
    if (response.data && Array.isArray(response.data.content)) {
      return response.data.content;
    } else if (Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (erro) {
    console.error("Erro ao listar grupos esportivos:", erro);
    throw erro;
  }
};

/**
 * Busca um grupo esportivo pelo seu ID.
 * @param {number|string} id - Identificador único do grupo.
 * @returns {Promise<Object>} Dados do grupo encontrado.
 */
export const buscarGrupo = async (id) => {
  try {
    const response = await api.get(`/grupos-esportivos/findById/${id}`);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao buscar grupo esportivo com ID ${id}:`, erro);
    throw erro;
  }
};

/**
 * Atualiza um grupo esportivo existente.
 * @param {number|string} id - Identificador do grupo.
 * @param {Object} grupo - Objeto com os novos dados do grupo.
 * @returns {Promise<Object>} Dados do grupo atualizado.
 */
export const atualizarGrupo = async (id, grupo) => {
  try {
    const response = await api.put(`/grupos-esportivos/update/${id}`, grupo);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao atualizar grupo esportivo com ID ${id}:`, erro);
    throw erro;
  }
};

/**
 * Exclui um grupo esportivo pelo seu ID.
 * @param {number|string} id - Identificador do grupo a ser removido.
 * @returns {Promise<Object>} Resposta de confirmação do backend.
 */
export const excluirGrupo = async (id) => {
  try {
    const response = await api.delete(`/grupos-esportivos/delete/${id}`);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao excluir grupo esportivo com ID ${id}:`, erro);
    throw erro;
  }
};