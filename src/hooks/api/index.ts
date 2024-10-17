
import { storage } from '@/utils';
import axios from 'axios';

export const baseURL = process.env.REACT_APP_SERVER_URL;

export const api = axios.create({
  baseURL: `https://unipod.ur.ac.rw:4000/api/v1/`
});

api.interceptors.request.use(
    (config) => {
      const tokenId = storage.getToken();
      if (tokenId) {
        config.headers.Authorization = `Bearer ${tokenId}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export const queryString = (query?: string): string => {
    return query ? `${query}` : '';
};