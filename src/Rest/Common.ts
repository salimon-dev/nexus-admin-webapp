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

function rotateToken() {
  const refreshToken = store.get(refreshTokenAtom);
  console.log(refreshToken);
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
    async (err) => {
      const error = err as AxiosError;
      if (error.status === 401 && accessToken) {
        await rotateToken();
        return error.response;
        // const rotateResponse = await rotateToken();
        // console.log("rotate response", rotateResponse);
        // if (rotateResponse.status !== 200) {
        //   store.set(accessTokenAtom, undefined);
        //   store.set(refreshTokenAtom, undefined);
        //   store.set(profileAtom, undefined);
        //   return error.response;
        // } else {
        //   store.set(accessTokenAtom, rotateResponse.data.access_token);
        //   store.set(refreshTokenAtom, rotateResponse.data.refresh_token);
        //   store.set(profileAtom, rotateResponse.data.data);
        //   if (!error.config) return error.response;
        //   error.config.headers["Authorization"] = "Bearer" + rotateResponse.data.access_token;
        //   return client(error.config);
        // }
      } else {
        return error.response;
      }
    }
  );
  return client;
}
