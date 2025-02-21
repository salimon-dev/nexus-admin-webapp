import Auth from "./Auth/Auth";
import { BrowserRouter } from "react-router-dom";
import Layout from "./App/App";
import { setupStorage } from "./Providers/Store";
import Splash from "./Components/Splash/Splash";
import { useEffect, useState } from "react";
import { useIsLoggedIn } from "./Providers/Auth";

export default function App() {
  const [phase, setPhase] = useState<"init" | "guest" | "member">("init");
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    setupStorage().then((result) => {
      if (result) {
        setPhase("member");
      } else {
        setPhase("guest");
      }
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setPhase("member");
    }
  }, [isLoggedIn]);

  if (phase === "init") return <Splash status="loading..." />;
  if (phase === "guest") {
    return <Auth />;
  }
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
