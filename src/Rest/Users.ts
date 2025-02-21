import { AxiosResponse } from "axios";
import { IUser } from "../specs";
import { httpClient, ICollection, ISearchParams } from "./Common";

interface IUserRecordParams {
  invitation_code: string;
  username: string;
  password?: string;
  status: number;
  role: number;
  credit: number;
  balance: number;
}

export async function createUser(params: IUserRecordParams): Promise<AxiosResponse<IUser>> {
  return httpClient().post("/users/create", params);
}
export async function updateUser(
  id: string,
  params: Partial<IUserRecordParams>
): Promise<AxiosResponse<IUser>> {
  return httpClient().post("/users/update/" + id, params);
}

interface ISearchUserParams extends ISearchParams {
  status?: string;
}

interface IInviationSearchRecord extends IUser {
  username: string;
}
export async function searchUsers(
  params: ISearchUserParams
): Promise<AxiosResponse<ICollection<IInviationSearchRecord>>> {
  return httpClient().get("/users/search", { params });
}

export async function deleteUser(id: string) {
  return httpClient().post("/users/delete/" + id);
}
