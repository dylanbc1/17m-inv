import { createServer } from 'http'
import { readFileSync, existsSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PORT = Number(process.env.PORT) || 8080
const DIST = join(__dirname, 'dist')

const MIMES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2',
}

const server = createServer((req, res) => {
  let path = req.url === '/' ? '/index.html' : req.url
  path = path.split('?')[0]
  const file = join(DIST, path)

  if (!existsSync(file) || !file.startsWith(DIST)) {
    const indexFile = join(DIST, 'index.html')
    if (existsSync(indexFile)) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(readFileSync(indexFile))
      return
    }
    res.writeHead(404).end()
    return
  }

  try {
    const data = readFileSync(file)
    const mime = MIMES[extname(file)] || 'application/octet-stream'
    res.writeHead(200, { 'Content-Type': mime })
    res.end(data)
  } catch {
    res.writeHead(404).end()
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`)
})
