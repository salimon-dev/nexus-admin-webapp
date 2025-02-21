import { AxiosResponse } from "axios";
import { IEntity } from "../specs";
import { httpClient, ICollection, ISearchParams } from "./Common";

interface IEntityRecordParams {
  status: number;
  permission: number;
  name: string;
  description: string;
  base_url: string;
  credit: number;
}

export async function createEntity(params: IEntityRecordParams): Promise<AxiosResponse<IEntity>> {
  return httpClient().post("/entities/create", params);
}
export async function updateEntity(id: string, params: IEntityRecordParams): Promise<AxiosResponse<IEntity>> {
  return httpClient().post("/entities/update/" + id, params);
}

interface ISearchEntityParams extends ISearchParams {
  status?: string;
}

interface IInviationSearchRecord extends IEntity {
  username: string;
}
export async function searchEntities(
  params: ISearchEntityParams
): Promise<AxiosResponse<ICollection<IInviationSearchRecord>>> {
  return httpClient().get("/entities/search", { params });
}

export async function deleteEntity(id: string) {
  return httpClient().post("/entities/delete/" + id);
}
