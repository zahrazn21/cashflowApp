import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // vite.config.js
server: {
  proxy: {
    "/api": "http://127.0.0.1:8000",
  },
}
,
  plugins: [react(),tailwindcss(),
    
    VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'CashFlowApp',
      short_name: 'cashflowApp',
      description: 'CashFlowApp',
      theme_color: '#ffffff',
             icons: [
          {
            src: "/assets/logo-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/assets/logo-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
    
  })],
})