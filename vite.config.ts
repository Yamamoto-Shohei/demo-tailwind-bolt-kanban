import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/demo-tailwind-bolt-kanban/",
	optimizeDeps: {
		exclude: ["lucide-react"],
	},
});
