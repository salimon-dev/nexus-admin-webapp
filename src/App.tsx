import Auth from "./Auth/Auth";
import { BrowserRouter } from "react-router-dom";
import Layout from "./App/App";
import { useIsLoggedIn } from "./Providers/Auth";
import { useQuery } from "react-query";
import { getProfile, rotateToken } from "./Rest/Auth";
import { accessTokenAtom, profileAtom, refreshTokenAtom, store } from "./Providers/Store";
import Splash from "./Components/Splash/Splash";

export default function App() {
  const isLoggedIn = useIsLoggedIn();

  const { isLoading } = useQuery(["profile"], async () => {
    const response = await getProfile();
    if (response.status === 200) {
      store.set(profileAtom, response.data);
    } else if (response.status === 401) {
      const response = await rotateToken();
      if (response.status === 401) {
        store.set(profileAtom, undefined);
        store.set(accessTokenAtom, undefined);
        store.set(refreshTokenAtom, undefined);
      }
      if (response.status === 200) {
        store.set(profileAtom, response.data.data);
        store.set(accessTokenAtom, response.data.access_token);
        store.set(refreshTokenAtom, response.data.refresh_token);
      }
    }
  });

  if (isLoading) return <Splash status="loading..." />;
  if (!isLoggedIn) {
    return <Auth />;
  }
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
