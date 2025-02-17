import { AxiosResponse } from "axios";
import { IEntity } from "../specs";
import { httpClient, ICollection, ISearchParams } from "./Common";

interface IEntitiesSearchParams extends ISearchParams {
  username?: string;
}

export async function searchEntities(
  params: IEntitiesSearchParams
): Promise<AxiosResponse<ICollection<IEntity>>> {
  return httpClient().get<ICollection<IEntity>>("/entities/search", { params });
}

interface IEntiyRecordParams {
  username: string;
  password: string;
  role: number;
  status: number;
  credit: number;
  balance: number;
  invitation_id: string;
}

export async function createUser(params: IEntiyRecordParams): Promise<AxiosResponse<IEntity>> {
  return httpClient().post("/entities/create", params);
}

export async function updateUser(id: string, params: IEntiyRecordParams): Promise<AxiosResponse<IEntity>> {
  return httpClient().post("/entities/update/" + id, params);
}

export async function deleteUser(id: string): Promise<AxiosResponse> {
  return httpClient().post("/entities/delete/" + id);
}
