import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dns from "node:dns";

// Prevent DNS from prioritizing IPv6 over IPv4
dns.setDefaultResultOrder("ipv4first");

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: "127.0.0.1",  // Bind explicitly to IPv4
    port: 5173,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    host: true,
    port: parseInt(process.env.PORT || "4173"),
    strictPort: true,
    allowedHosts: ["signala-fullstack.onrender.com"],
  },
});
