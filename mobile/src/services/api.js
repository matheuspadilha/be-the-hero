/**
 * @file: api.js
 * @author: Matheus Padilha
 * @copyright (c) - 3/2020
 *
 */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export default api;