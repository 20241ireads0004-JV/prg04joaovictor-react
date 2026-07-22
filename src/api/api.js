import axios from 'axios';

// Define a URL base para todas as chamadas da API
const API_BASE_URL = 'https://prg04joaovictor-backend.onrender.com'; 

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ==========================================
// EXPORTAÇÃO PADRÃO (DEFAULT EXPORT)
// ==========================================
// Adicionar esta linha permite que outros arquivos façam: import api from "./api";
export default api;