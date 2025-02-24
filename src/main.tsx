import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "jotai";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./Providers/Store.ts";
import { loadConfigs } from "./Rest/Common.ts";

const queryClient = new QueryClient();

loadConfigs()
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>
        </QueryClientProvider>
      </StrictMode>
    );
  })
  .catch(() => {
    createRoot(document.getElementById("root")!).render(<StrictMode>failed to load config</StrictMode>);
  });
