import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// List of required environment variables
const requiredEnvVars = ["VITE_API_URL", "VITE_REFRESH_INTERVAL_MINUTES"];

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  // Validate required environment variables
  const missingEnvVars = requiredEnvVars.filter((envVar) => !env[envVar]);

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingEnvVars.map((v) => `  - ${v}`).join("\n")}\n` +
        `Please set them in your .env file or environment.`
    );
  }

  return {
    plugins: [react()],
    build: {
      outDir: "dist",
    },
  };
});
