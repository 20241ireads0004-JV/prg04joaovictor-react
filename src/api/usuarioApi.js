import api from "./api";

/**
 * Realiza o login do usuário.
 * @param {Object} dados - Contém login e senha.
 */
export const login = (dados) =>
    api.post("/usuarios/login", dados);

/**
 * Cadastra um novo usuário.
 * @param {Object} usuario - Dados do usuário.
 */
export const cadastrarUsuario = (usuario) =>
    api.post("/usuarios/save", usuario);

/**
 * Lista os usuários com paginação.
 * Retorna diretamente o array 'content'.
 * @param {number} page - Número da página (padrão: 0).
 * @param {number} size - Quantidade de itens por página (padrão: 10).
 */
export const listarUsuarios = async (page = 0, size = 10) => {
    const response = await api.get(`/usuarios/findAll?page=${page}&size=${size}`);
    return response.data?.content || [];
};

/**
 * Busca um usuário pelo ID.
 * @param {number|string} id - Identificador do usuário.
 */
export const buscarUsuario = (id) =>
    api.get(`/usuarios/findById/${id}`);

/**
 * Atualiza um usuário existente.
 * @param {number|string} id - Identificador do usuário.
 * @param {Object} usuario - Novos dados do usuário.
 */
export const atualizarUsuario = (id, usuario) =>
    api.put(`/usuarios/update/${id}`, usuario);

/**
 * Exclui um usuário pelo ID.
 * @param {number|string} id - Identificador do usuário.
 */
export const excluirUsuario = (id) =>
    api.delete(`/usuarios/delete/${id}`);