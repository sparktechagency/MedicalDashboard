// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     //allowedHosts: ["maniknew8080.sobhoy.com", "maniknew8080.sobhoy.com"],
//     allowedHosts: ["admin.mstauctionsolutions.com"],
//     host: "0.0.0.0",
//     port: 8080,
//   },
// });

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
