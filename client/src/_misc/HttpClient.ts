import axios from 'axios';

const transformParamsToConfigObject = (params: any) =>
  params
    ? { params }
    : undefined;

export const HttpClient = {
  get: async <T>(url: string, queryParams?: any): Promise<T> =>
    (await axios.get<T>(url, transformParamsToConfigObject(queryParams))).data,
  post: async <T = void>(url: string, data?: any, queryParams?: any): Promise<T> =>
    (await axios.post<T>(url, data, transformParamsToConfigObject(queryParams))).data,
  delete: async(url: string) =>
    await axios.delete(url),
};
