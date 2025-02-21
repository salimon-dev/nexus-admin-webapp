import axios from "axios";
import { IAuthResponse } from "../Rest/Auth";
import { IProfile } from "../specs";
import { atom, createStore } from "jotai";

export const store = createStore();

export const accessTokenAtom = atom<string>();
export const refreshTokenAtom = atom<string>();
export const profileAtom = atom<IProfile>();

export function getStorage(): IAuthResponse | undefined {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const profile = localStorage.getItem("profile");
  if (!access_token || !refresh_token || !profile) {
    return undefined;
  } else {
    return {
      access_token,
      refresh_token,
      data: JSON.parse(profile),
    };
  }
}

export function setStorage(value: IAuthResponse) {
  localStorage.setItem("access_token", value.access_token);
  localStorage.setItem("refresh_token", value.refresh_token);
  localStorage.setItem("profile", JSON.stringify(value.data));

  store.set(accessTokenAtom, value.access_token);
  store.set(refreshTokenAtom, value.refresh_token);
  store.set(profileAtom, value.data);
}

export async function setupStorage(): Promise<boolean> {
  const storage = getStorage();
  if (!storage) return false;
  try {
    const response = await axios.get("/profile", {
      baseURL: import.meta.env["VITE_BASE_URL"],
      headers: { Authorization: "Bearer " + storage.access_token },
    });
    storage.data = response.data;
    setStorage(storage);
    return true;
  } catch {
    try {
      const response = await axios.post<IAuthResponse>(
        "/auth/rotate",
        { token: storage.refresh_token },
        { baseURL: import.meta.env["VITE_BASE_URL"] }
      );
      setStorage(response.data);
      return true;
    } catch {
      return false;
    }
  }
}
