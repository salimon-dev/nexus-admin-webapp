import { AxiosResponse } from "axios";
import { IInvitation } from "../specs";
import { httpClient, ICollection, ISearchParams } from "./Common";

interface IInvitationRecordParams {
  code?: string;
  usage_remaining: number;
  status: number;
  expires_at: string;
}

export async function createInvitation(params: IInvitationRecordParams): Promise<AxiosResponse<IInvitation>> {
  return httpClient().post("/invitations/create", params);
}
export async function updateInvitation(
  id: string,
  params: IInvitationRecordParams
): Promise<AxiosResponse<IInvitation>> {
  return httpClient().post("/invitations/update/" + id, params);
}

interface ISearchInvitationParams extends ISearchParams {
  status?: string;
}

interface IInviationSearchRecord extends IInvitation {
  username: string;
}
export async function searchInvitations(
  params: ISearchInvitationParams
): Promise<AxiosResponse<ICollection<IInviationSearchRecord>>> {
  return httpClient().get("/invitations/search", { params });
}

export async function deleteInvitation(id: string) {
  return httpClient().post("/invitations/delete/" + id);
}
