import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["maniknew8080.sobhoy.com", "maniknew8080.sobhoy.com"],
    host: "0.0.0.0",
    port: 8080,
  },
});
