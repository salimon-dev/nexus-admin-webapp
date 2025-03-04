import axios, { AxiosError, CreateAxiosDefaults } from "axios";
import { accessTokenAtom, refreshTokenAtom, store } from "../Providers/Store";

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

// TODO: implement this function
function rotateToken() {
  const refreshToken = store.get(refreshTokenAtom);
  console.log(refreshToken);
}

export function httpClient() {
  const config: CreateAxiosDefaults = { baseURL: import.meta.env["VITE_NEXUS_BASE_URL"] };
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
    async (err) => {
      const error = err as AxiosError;
      if (error.status === 401 && accessToken) {
        await rotateToken();
        return error.response;
      } else {
        return error.response;
      }
    }
  );
  return client;
}
