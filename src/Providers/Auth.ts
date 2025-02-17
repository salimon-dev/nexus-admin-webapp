import { useAtomValue } from "jotai";
import { accessTokenAtom } from "./Store";

export function useIsLoggedIn() {
  const accessToken = useAtomValue(accessTokenAtom);
  return !!accessToken;
}
