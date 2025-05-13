import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["admin.wokedatingsite.com", "admin.wokedatingsite.com"],
    host: "0.0.0.0",
    port: 5173,
  },
});
