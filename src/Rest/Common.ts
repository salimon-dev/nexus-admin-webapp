import axios, { AxiosError, CreateAxiosDefaults } from "axios";
import { accessTokenAtom, profileAtom, refreshTokenAtom, store } from "../Providers/Store";

export interface ISearchParams {
  page: number;
  page_size: number;
}

export interface ICollection<T> {
  data: T[];
  page: number;
  page_size: number;
  total: number;
}

export function httpClient() {
  const config: CreateAxiosDefaults = { baseURL: import.meta.env["VITE_BASE_URL"] };
  const accessToken = store.get(accessTokenAtom);
  if (accessToken) {
    config.headers = {
      Authorization: "Bearer " + accessToken,
    };
  }
  const client = axios.create(config);
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      const error = err as AxiosError;
      if (error.status === 401) {
        store.set(accessTokenAtom, undefined);
        store.set(refreshTokenAtom, undefined);
        store.set(profileAtom, undefined);
      }
      return error.response;
    }
  );
  return client;
}
