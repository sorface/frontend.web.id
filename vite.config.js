import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { join } from 'path'

// Helper function to load development.env file
function loadDevelopmentEnv() {
  try {
    const envPath = join(process.cwd(), 'development.env')
    const envContent = readFileSync(envPath, 'utf-8')
    const env = {}
    
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=')
        const value = valueParts.join('=')
        env[key.trim()] = value.trim()
      }
    })
    
    return env
  } catch (error) {
    console.warn('Could not load development.env file:', error.message)
    return {}
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  // Load development.env file
  const devEnv = loadDevelopmentEnv()
  
  // Merge environments (loadEnv takes precedence over development.env)
  const mergedEnv = { ...devEnv, ...env }
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      host: true,
      historyApiFallback: true
    },
    build: {
      outDir: 'build',
    },
    define: {
      // Expose env variables to the client side
      ...Object.keys(mergedEnv).reduce((acc, key) => {
        if (key.startsWith('VITE_')) {
          acc[`import.meta.env.${key}`] = JSON.stringify(mergedEnv[key])
        }
        return acc
      }, {}),
    },
    envDir: './',
    envPrefix: 'VITE_'
  }
})
