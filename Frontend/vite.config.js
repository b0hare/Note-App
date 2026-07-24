import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   host: true,          // Listens on your local network
  //   allowedHosts: true   // 👈 ADD THIS: Permits Localtunnel/Ngrok domains
  // }
})
