// src/api/axios.js
import axios from 'axios';

const urlBase = axios.create({
  baseURL: 'https://66d3463e184dce1713cfc9ba.mockapi.io',
});

export default urlBase;
