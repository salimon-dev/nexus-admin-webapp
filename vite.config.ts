import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(function ({ mode }) {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: env["VITE_APP_BASE_PATH"] || "/",
    preview: {
      port: 80,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
