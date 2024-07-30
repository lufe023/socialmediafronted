// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dist",
        rollupOptions: {
            input: {
                main: "index.html",
            },
        },
    },
    publicDir: "public", // Asegúrate de que esto esté configurado correctamente
});
