import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command, mode }) => {
  const backendUrl = mode === 'development' 
    ? 'http://localhost:4000' 
    : 'https://grocery-zeta-five.vercel.app'  // Your actual deployed backend URL

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
          secure: false
        },
      }
    }
  }
})
