import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   proxy: {
  //     '/apiVia_Cep': {
  //       target: 'https://viacep.com.br',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/apiVia_Cep/, '')
  //     }
  //   }
  // }
})
