import axios from 'axios';

export const HttpClient = {
  get: async <T>(url: string): Promise<T> =>
    (await axios.get<T>(url)).data,
  post: async <T = void>(url: string, data: any): Promise<T> =>
    (await axios.post<T>(url, data)).data,
};

export type IHttpClient = typeof HttpClient;