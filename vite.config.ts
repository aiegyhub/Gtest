import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    server: {
      host: "0.0.0.0", // Use 0.0.0.0 to be accessible on the network
      port: 8080,
    },
    plugins: [
      react(),
      // Conditionally apply the component tagger plugin only in development
      isDevelopment && componentTagger(),
      // Enable vendor chunk splitting for better caching in production
      !isDevelopment && splitVendorChunkPlugin(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Generate source maps only for development builds
      sourcemap: isDevelopment,
      rollupOptions: {
        output: {
          // Manually chunk vendor libraries for better caching strategy
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              // Group major libraries into their own chunks
              if (id.includes('react')) return 'vendor_react';
              if (id.includes('lucide')) return 'vendor_icons';
              if (id.includes('recharts')) return 'vendor_charts';
              if (id.includes('radix-ui')) return 'vendor_radix';
              
              // Group all other node_modules into a single vendor chunk
              return 'vendor';
            }
          },
        },
      },
    },
  };
});