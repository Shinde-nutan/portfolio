import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" lets the build work at any GitHub Pages path
export default defineConfig({ base: "./", plugins: [react()] });
