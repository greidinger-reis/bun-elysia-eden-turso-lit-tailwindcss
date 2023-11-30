import fs from 'fs'
import { minify } from 'csso'
import { config } from '@/config'
import minimist from 'minimist'

function parseArgs(): [string, string, boolean] {
    const argv = Bun.argv.slice(2)
    const args = minimist(argv, {
        boolean: 'watch',
        default: {
            watch: false,
        },
    })

    let input = args['input'] as string | undefined
    let output = args['output'] as string | undefined
    let watch = args['watch'] as boolean

    if (!input || !output) {
        throw new Error('Missing input or output parameter')
    }

    return [input, output, watch]
}

class ClientBundler {
    constructor(stylesInput: string, stylesOutput: string, devMode: boolean) {
        this.setupClient(devMode)
        this.setupStyles(stylesInput, stylesOutput, devMode)
    }

    makePublicFolder() {
        if (!fs.existsSync('public')) {
            fs.mkdirSync('public')
        }
    }

    async buildClient() {
        const start = Date.now()
        this.makePublicFolder()
        await Bun.build({
            entrypoints: ['src/web/index.ts'],
            outdir: 'public',
            target: 'browser',
            minify: config.env.NODE_ENV === 'production',
        })
            .then(() => console.log(`🦊 Compiled Components - ${Date.now() - start}ms`))
            .catch(console.error)
    }

    async setupClient(dev: boolean) {
        await this.buildClient()

        if (dev) {
            let reloadCount = 0
            fs.watch('src/web/components', { persistent: false }, async () => {
                reloadCount++
                await this.buildClient()
                await fetch('http://localhost:3001/restart')

                console.log(`🦊 Triggering Live Reload. Reload count: ${reloadCount}`)
            })
        }
    }

    async parseAndWriteStylesForLit(input: string, output: string) {
        let contents = await Bun.file(input)
            .text()
            .catch(() => {
                console.log(`Failed to read file ${input}. Might just not be created yet? retrying..`)
                return ''
            })

        let cleanContents = contents.replaceAll('`', '')
        cleanContents = cleanContents.replaceAll('\\', '\\\\')
        if (config.env.NODE_ENV === 'production') {
            cleanContents = minify(cleanContents).css
        }

        const litContents = `import { css } from "lit";\nexport const TWStyles = css\` ${cleanContents} \``

        await Bun.write(output, litContents)
            .then(() => console.log(`🦊 Tw-Lit: Wrote to file ${output}`))
            .catch(console.error)
    }

    async writeStylesForSSR(input: string) {
        const file = Bun.file(input)
        this.makePublicFolder()
        await Bun.write('public/styles.css', file)
    }

    async setupStyles(input: string, output: string, dev: boolean) {
        await this.parseAndWriteStylesForLit(input, output)
        await this.writeStylesForSSR(input)

        if (dev) {
            console.log(`🦊 Tw-lit: Watching ${input} and writing to ${output}`)
            fs.watchFile(input, { interval: 1000 }, async () => {
                await this.parseAndWriteStylesForLit(input, output)
                await this.writeStylesForSSR(input)
            })
        }
    }
}

new ClientBundler(...parseArgs())
