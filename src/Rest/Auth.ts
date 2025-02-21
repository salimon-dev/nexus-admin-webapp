import { AxiosResponse } from "axios";
import { httpClient } from "./Common";
import { IProfile } from "../specs";

export interface IAuthResponse {
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
