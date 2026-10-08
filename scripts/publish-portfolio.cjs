const { copyFileSync } = require('node:fs')
const { resolve } = require('node:path')

copyFileSync(
  resolve(__dirname, '../public/official-portfolio.html'),
  resolve(__dirname, '../out/index.html'),
)
