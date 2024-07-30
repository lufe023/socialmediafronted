import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
