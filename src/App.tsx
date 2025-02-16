// import Auth from "./Auth/Auth";
import { BrowserRouter } from "react-router-dom";
import Layout from "./App/App";

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
  return <Layout />;
  // return <Auth />;
}
