import { AxiosResponse } from "axios";
import { IUser } from "../specs";
import { httpClient, ICollection, ISearchParams } from "./Common";

interface IUsersSearchParams extends ISearchParams {
  username?: string;
}

export async function searchUsers(params: IUsersSearchParams): Promise<AxiosResponse<ICollection<IUser>>> {
  return httpClient().get<ICollection<IUser>>("/users/search", { params });
}

interface IUserRecordParams {
  username: string;
  password: string;
  role: number;
  status: number;
  credit: number;
  balance: number;
  invitation_id: string;
}

export async function createUser(params: IUserRecordParams): Promise<AxiosResponse<IUser>> {
  return httpClient().post("/users/create", params);
}

export async function updateUser(id: string, params: IUserRecordParams): Promise<AxiosResponse<IUser>> {
  return httpClient().post("/users/update/" + id, params);
}

export async function deleteUser(id: string): Promise<AxiosResponse> {
  return httpClient().post("/users/delete/" + id);
}
