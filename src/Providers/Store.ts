import { atomWithStorage } from "jotai/utils";
import { IProfile } from "../specs";
import { createStore } from "jotai";

export const store = createStore();

export const accessTokenAtom = atomWithStorage<string | undefined>("access_token", undefined);
export const refreshTokenAtom = atomWithStorage<string | undefined>("refresh_token", undefined);
export const profileAtom = atomWithStorage<IProfile | undefined>("profile", undefined);
