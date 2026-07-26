import api from "./api";

/**
 * Lista todos os locais cadastrados no sistema.
 * @returns {Promise<Array>} Lista de locais retornados pelo backend.
 */
export const listarLocais = async () => {
  try {
    const response = await api.get("/locais/findAll");
    if (response.data && Array.isArray(response.data.content)) {
      return response.data.content;
    } else if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (erro) {
    console.error("Erro ao buscar a lista de locais:", erro);
    return [];
  }
};

/**
 * Cadastra um novo local no sistema.
 * @param {Object} localDTO - Objeto contendo nome, endereco, cidade e bairro (LocalPostRequestDto).
 * @returns {Promise<Object>} Objeto com o local cadastrado contendo o ID gerado (LocalGetResponseDto).
 */
export const cadastrarLocal = async (localDTO) => {
  try {
    const response = await api.post("/locais/save", localDTO);
    return response.data; // Retorna o LocalGetResponseDto com o id preenchido
  } catch (erro) {
    console.error("Erro ao cadastrar novo local:", erro);
    throw erro;
  }
};