import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Include .jsx files
      include: "**/*.{jsx,tsx}",
    })
  ],
  
  // Development server configuration
  server: {
    host: true, // Allow external connections
    port: 3000, // Development port
    open: true, // Automatically open browser
    cors: true, // Enable CORS
    hmr: {
      overlay: false // Disable error overlay for better UX
    }
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true, // Generate source maps for debugging
    minify: 'terser', // Use Terser for better minification
    target: 'es2015', // Support older browsers
    rollupOptions: {
      output: {
        // Optimize chunk splitting
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion'],
          icons: ['react-icons'],
          utils: ['react-intersection-observer']
        },
        // Clean file names
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(extType)) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    // Optimize bundle size
    chunkSizeWarningLimit: 1000,
  },
  
  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@utils': resolve(__dirname, './src/utils'),
      '@assets': resolve(__dirname, './src/assets')
    }
  },
  
  // CSS configuration
  css: {
    preprocessorOptions: {
      // If you want to use SCSS in the future
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    devSourcemap: true, // Enable CSS source maps in development
    modules: {
      // CSS Modules configuration (if needed)
      localsConvention: 'camelCaseOnly'
    }
  },
  
  // Preview server configuration (for production preview)
  preview: {
    host: true,
    port: 4173,
    open: true
  },
  
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion',
      'react-icons/fa',
      'react-intersection-observer'
    ],
    exclude: ['@vitejs/plugin-react']
  },
  
  // Base URL (useful for deployment)
  base: '/',
  
  // Public directory
  publicDir: 'public',
  
  // Asset handling
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  
  // ESBuild configuration for faster builds
  esbuild: {
    target: 'es2015',
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  
  // Development experience
  clearScreen: false, // Keep terminal history visible
  
  // Logging
  logLevel: 'info'
})
