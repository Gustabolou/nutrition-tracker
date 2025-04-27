import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  // Carrega as variáveis de ambiente do arquivo .env
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/nutrition-api': {
          target: 'https://trackapi.nutritionix.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/nutrition-api/, '/v2'),
          headers: {
            'x-app-id': env.VITE_NUTRITIONIX_ID,
            'x-app-key': env.VITE_NUTRITIONIX_KEY
          }
        }
      }
    }
  })
}