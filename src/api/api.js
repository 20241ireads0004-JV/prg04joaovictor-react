import axios from 'axios';

// Define a URL base para todas as chamadas da API
const API_BASE_URL = 'https://prg04joaovictor-backend.onrender.com'; 

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Exemplo de chamada aos eventos esportivos
export const getEventos = async () => {
  const response = await api.get('/eventosesportivos');
  return response.data;
};