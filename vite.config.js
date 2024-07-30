import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist", // Asegúrate de que esto sea 'dist' y no 'dist/dist'
        rollupOptions: {
            input: {
                main: "index.html",
            },
        },
    },
});
