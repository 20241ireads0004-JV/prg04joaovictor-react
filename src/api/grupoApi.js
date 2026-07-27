import api from "./api";

/**
 * Cadastra um novo grupo esportivo no backend Spring Boot.
 * @param {Object} grupoDTO - Dados do grupo (nome, descricao, dataCriacao, esporteNome).
 * @param {number|string} usuarioId - ID do utilizador logado (será o administrador).
 * @returns {Promise<Object>} Grupo cadastrado retornado do backend.
 */
export const cadastrarGrupo = async (grupoDTO, usuarioId) => {
  try {
    const response = await api.post(`/grupos-esportivos/save/${usuarioId}`, grupoDTO);
    return response.data;
  } catch (erro) {
    console.error("Erro ao cadastrar grupo no servidor:", erro);
    throw erro;
  }
};

/**
 * Solicita a entrada de um atleta/utilizador num grupo esportivo.
 * Rota mapeada: POST /grupos-esportivos/{grupoId}/solicitar-entrada/{atletaId}
 * 
 * @param {number|string} grupoId - ID do grupo esportivo.
 * @param {number|string} atletaId - ID do atleta/utilizador logado.
 */
export const solicitarEntrada = async (grupoId, atletaId) => {
  try {
    const response = await api.post(`/grupos-esportivos/${grupoId}/solicitar-entrada/${atletaId}`);
    return response.data;
  } catch (erro) {
    console.error("Erro ao solicitar entrada no grupo:", erro);
    throw erro;
  }
};

/**
 * Aceita um atleta no grupo esportivo (ação do Administrador).
 * Rota mapeada: POST /grupos-esportivos/{grupoId}/aceitar-atleta/{atletaId}/{adminIdLogado}
 * 
 * @param {number|string} grupoId - ID do grupo esportivo.
 * @param {number|string} atletaId - ID do atleta a ser aceite.
 * @param {number|string} adminIdLogado - ID do administrador logado.
 */
export const aceitarMembro = async (grupoId, atletaId, adminIdLogado) => {
  try {
    const response = await api.post(
      `/grupos-esportivos/${grupoId}/aceitar-atleta/${atletaId}/${adminIdLogado}`
    );
    return response.data;
  } catch (erro) {
    console.error("Erro ao aceitar atleta no grupo:", erro);
    throw erro;
  }
};

/**
 * Lista todos os grupos esportivos cadastrados com suporte a paginação.
 * @param {number} page - Número da página (padrão: 0).
 * @param {number} size - Itens por página (padrão: 10).
 * @returns {Promise<Array>} Lista de grupos.
 */
export const listarGrupos = async (page = 0, size = 10) => {
  try {
    const response = await api.get(`/grupos-esportivos/findAll?page=${page}&size=${size}`);
    
    // Tratamento para extrair a lista dentro de 'content' do Spring Pageable
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
 * Busca um grupo esportivo específico pelo seu ID.
 * @param {number|string} id - ID do grupo.
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
 * Atualiza os dados de um grupo esportivo existente.
 * @param {number|string} id - ID do grupo a ser atualizado.
 * @param {Object} grupo - Novos dados do grupo.
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
 * Exclui um grupo esportivo do sistema pelo seu ID.
 * @param {number|string} id - ID do grupo a eliminar.
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