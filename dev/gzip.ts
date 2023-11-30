import fs from 'fs/promises'

const assetsRaw = await fs.readdir('./public')
const assets = assetsRaw.filter((asset) => asset.endsWith('.js') || asset.endsWith('.css'))

for (const asset of assets) {
    const file = Bun.file(`./public/${asset}`)
    const buffer = await file.arrayBuffer()
    const gzipped = Bun.gzipSync(new Uint8Array(buffer))
    await Bun.write(file, gzipped)
}
