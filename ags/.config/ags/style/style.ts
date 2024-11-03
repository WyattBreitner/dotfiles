import { bash } from "lib/utils"
import { Opt } from "lib/option"
import theme from "lib/theme"

const $ = (name: string, value: string | Opt<any>) => `$${name}: ${value};`

const variables = () => [
	$("fg", theme.dark.fg),
	$("bg", theme.dark.bg),
	$("radius", `${theme.radius}px`),
	$("padding", `${theme.padding}pt`),
	$("spacing", `${theme.spacing}pt`),
	$("transition", `${theme.transition}ms`),
]

async function resetCss() {
	try {
		const varFile = `${TMP}/scssVars.scss`
		const scssFile = `${TMP}/main.scss`
		const cssFile = `${TMP}/main.css`

		const fd = await bash(`fd ".scss" ${App.configDir}`)
		const files = fd.split(/\s+/)
		const imports = [varFile, ...files].map(f => `@import '${f}';`)

		await Utils.writeFile(variables().join("\n"), varFile)
		await Utils.writeFile(imports.join("\n"), scssFile)
		await bash`sass ${scssFile} ${cssFile}`

		App.applyCss(cssFile, true)
	} catch (error) {
		logError(error)
	}
}

Utils.monitorFile(`${App.configDir}/style`, resetCss)
await resetCss()
