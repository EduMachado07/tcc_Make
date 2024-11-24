// src/api/axios.js
import axios from 'axios';

const urlBase = axios.create({
  baseURL: 'https://localhost:3000/api',
});

export default urlBase;
