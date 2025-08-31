import axios from 'axios';
import { API_URL } from '@env'; // Importa a URL do arquivo .env

const api = axios.create({
  baseURL: API_URL, // Usa a URL como base para todas as requisições
});

export default api;