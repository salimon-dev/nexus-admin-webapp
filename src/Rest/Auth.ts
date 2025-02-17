import { AxiosResponse } from "axios";
import { httpClient } from "./Common";
import { IProfile } from "../specs";
import { refreshTokenAtom, store } from "../Providers/Store";

interface IAuthResponse {
  data: IProfile;
  access_token: string;
  refresh_token: string;
}

interface ILoginParams {
  username: string;
  password: string;
}
export async function login(params: ILoginParams): Promise<AxiosResponse<IAuthResponse>> {
  return httpClient().post<IAuthResponse>("/auth/login", params);
}

export async function getProfile(): Promise<AxiosResponse<IProfile>> {
  return httpClient().get<IProfile>("/profile");
}

export async function rotateToken(): Promise<AxiosResponse<IAuthResponse>> {
  const refreshToken = store.get(refreshTokenAtom);
  return httpClient().post<IAuthResponse>("/auth/rotate", { token: refreshToken });
}
