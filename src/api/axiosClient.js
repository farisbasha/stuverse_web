import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://stuverse.in/api', // Base URL for all requests
});