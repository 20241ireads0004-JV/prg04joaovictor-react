// src/api/usuarioApi.js

import api from "./api";

/**
 * Realiza o login do utilizador no sistema.
 * @param {Object} dados - Objeto contendo o login/email e a senha.
 * @returns {Promise<Object>} Resposta do backend com o token/dados de autenticação.
 */
export const login = async (dados) => {
  try {
    const response = await api.post("/usuarios/login", dados);
    return response.data;
  } catch (erro) {
    console.error("Erro ao realizar login:", erro);
    throw erro;
  }
};

/**
 * Cadastra um novo utilizador no backend.
 * @param {Object} usuario - Objeto contendo os dados do utilizador.
 * @returns {Promise<Object>} Dados do utilizador cadastrado.
 */
export const cadastrarUsuario = async (usuario) => {
  try {
    const response = await api.post("/usuarios/save", usuario);
    return response.data;
  } catch (erro) {
    console.error("Erro ao cadastrar utilizador:", erro);
    throw erro;
  }
};

/**
 * Lista os utilizadores cadastrados com suporte a paginação do Spring Boot.
 * Extrai diretamente o array de utilizadores contido em 'content'.
 * @param {number} page - Número da página desejada (padrão: 0).
 * @param {number} size - Quantidade de itens por página (padrão: 10).
 * @returns {Promise<Array>} Lista de utilizadores.
 */
export const listarUsuarios = async (page = 0, size = 10) => {
  try {
    const response = await api.get(`/usuarios/findAll?page=${page}&size=${size}`);

    // Tratamento seguro: verifica se o Spring retornou um objeto paginado ou lista direta
    if (response.data && Array.isArray(response.data.content)) {
      return response.data.content;
    } else if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (erro) {
    console.error("Erro ao listar utilizadores:", erro);
    throw erro;
  }
};

/**
 * Busca um utilizador específico pelo seu ID.
 * @param {number|string} id - Identificador único do utilizador.
 * @returns {Promise<Object>} Dados do utilizador encontrado.
 */
export const buscarUsuario = async (id) => {
  try {
    const response = await api.get(`/usuarios/findById/${id}`);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao buscar utilizador com ID ${id}:`, erro);
    throw erro;
  }
};

/**
 * Atualiza os dados de um utilizador existente.
 * @param {number|string} id - Identificador do utilizador.
 * @param {Object} usuario - Novos dados do utilizador.
 * @returns {Promise<Object>} Dados do utilizador atualizado.
 */
export const atualizarUsuario = async (id, usuario) => {
  try {
    const response = await api.put(`/usuarios/update/${id}`, usuario);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao atualizar utilizador com ID ${id}:`, erro);
    throw erro;
  }
};

/**
 * Exclui um utilizador do sistema pelo seu ID.
 * @param {number|string} id - Identificador do utilizador a ser removido.
 * @returns {Promise<Object>} Resposta de confirmação do backend.
 */
export const excluirUsuario = async (id) => {
  try {
    const response = await api.delete(`/usuarios/delete/${id}`);
    return response.data;
  } catch (erro) {
    console.error(`Erro ao excluir utilizador com ID ${id}:`, erro);
    throw erro;
  }
};