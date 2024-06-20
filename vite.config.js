import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'copy-resolved',
          async resolveId(id) {
            if (id.startsWith('/img')) {
              return id
            }
            return null
          },
          async load(id) {
            if (id.startsWith('/img')) {
              const file = resolve(__dirname, id.slice(1))
              const content = await fs.promises.readFile(file)
              return `export default ${JSON.stringify(content.toString())}`
            }
            return null
          }
        }
      ],
      input: {
        index: resolve(__dirname, 'index.html'),
        card: resolve(__dirname, 'card/index.html'),
        checkout: resolve(__dirname, 'checkout/index.html'),
        main: resolve(__dirname, './main.js')
      },
      output: {
        entryFileNames: '[name]/assets/[name]-[hash].js',
        chunkFileNames: '[name]/assets/[name]-[hash].js',
        assetFileNames: '[name]/assets/[name]-[hash][extname]'
      }
    },
    outDir: 'dist' 
  },
  css: {
    include: [
      './style.css'
    ]
  }
})