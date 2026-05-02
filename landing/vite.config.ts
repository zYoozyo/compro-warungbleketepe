import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sharedAssetsRoot = path.resolve(__dirname, '..', 'assets')

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.css': 'text/css',
  '.js': 'text/javascript',
}

function warungSharedAssetsPlugin(): Plugin {
  return {
    name: 'warung-shared-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.url?.split('?')[0]
        if (!raw?.startsWith('/site/')) return next()
        const rel = decodeURIComponent(raw.slice('/site/'.length))
        if (!rel || rel.includes('..')) return next()
        const filePath = path.resolve(sharedAssetsRoot, rel)
        if (!filePath.startsWith(sharedAssetsRoot)) return next()

        fs.stat(filePath, (err, st) => {
          if (err || !st.isFile()) return next()
          const ext = path.extname(filePath).toLowerCase()
          res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream')
          fs.createReadStream(filePath).pipe(res)
        })
      })
    },
    async closeBundle() {
      const outDir = path.resolve(__dirname, 'dist', 'site')
      await fs.promises.rm(outDir, { recursive: true, force: true })
      await fs.promises.cp(sharedAssetsRoot, outDir, { recursive: true })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), warungSharedAssetsPlugin()],
})
