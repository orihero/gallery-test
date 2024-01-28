import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

const API_URL = 'https://api.unsplash.com/';
const ACCESS_KEY = 'eHAwQ-VeImHMJhIvd9pebzQV59n8cfdbXWZx_6jNeko'

const globalRequestConfig: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
  },
};

const combineUrls = (url: string): string => {
  return `${API_URL}${url}`;
};

const combineConfig = (
  config: AxiosRequestConfig | undefined
): AxiosRequestConfig | undefined => {
  return { ...globalRequestConfig, ...config };
};

export default class ApiService {

  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error) {
          console.log('[Error]:', error?.response?.data);
        }
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.request.use(
      (config) => {
        if (config.url?.includes('?')) {
          config.url = `${config.url}&client_id=${ACCESS_KEY}`;
          return config;
        }
        config.url = `${config.url}&client_id=${ACCESS_KEY}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }


  methods = {
    get: <R>(url: string, config?: AxiosRequestConfig) =>
      this.axios.get<R>(combineUrls(url), combineConfig(config)),

    post: <R, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
      this.axios.post<R>(combineUrls(url), data, combineConfig(config)),

    put: <R, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
      this.axios.put<R>(combineUrls(url), data, combineConfig(config)),

    patch: <R, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
      this.axios.patch<R>(combineUrls(url), data, combineConfig(config)),

    delete: <R>(url: string, config?: AxiosRequestConfig) =>
      this.axios.delete<R>(combineUrls(url), combineConfig(config)),
  }
};