import Axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { apiEndPoint } from '../../config.json';

const Http = () => {
  const http: AxiosInstance = Axios.create({
    baseURL: apiEndPoint,
  });

  http.interceptors.response.use(undefined, (err) => {
    const expectedError: AxiosError =
      err.response && err.response.status >= 400 && err.response.status < 500;
    if (expectedError) {
      console.error('SOMETHING UNEXPECTED HAPPENED');
      toast.error('An unexpected error occurred');
    }
    return Promise.reject(err);
  });

  return {
    get: async <TResponse>(url: string): Promise<TResponse> => {
      const response = await http.get<TResponse>(url);
      return response.data;
    },
    post: async <TResponse, TRequest>(
      url: string,
      body: TRequest
    ): Promise<TResponse> => {
      const response = await http.post<TResponse>(url, body);
      return response.data;
    },
    put: async <TResponse, TRequest>(
      url: string,
      body: TRequest
    ): Promise<TResponse> => {
      const response = await http.put<TResponse>(url, body);
      return response.data;
    },
    delete: async <TResponse>(url: string): Promise<TResponse> => {
      const response = await http.delete<TResponse>(url);
      return response.data;
    },
  };
};

export default Http;
