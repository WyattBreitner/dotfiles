import { opt, saveOptions } from "lib/option"
import GLib from "gi://GLib"
import { BarWidget } from "widgets/bar/Bar"

export const baseTheme = {
	themeFile: opt(""),

	transition: opt(200),
	radius: opt(11),
	padding: opt(7),
	spacing: opt(12),
	dark: {
		fg: opt("#8653cb"),
		bg: opt("#141414"),
		active_color: opt("#eeeeee")

	},
	notifications: {
		width: opt(400),
	},
	bar: {
		transparent: opt(true),
		layout: {
			start: opt<Array<BarWidget>>([
				"workspaces",
			]),
			center: opt<Array<BarWidget>>([
				"datetime",
			]),
			end: opt<Array<BarWidget>>([
				"expander",
				"systemtray"
			]),
		},
		datetime: {
			format: opt("%-l:%M - %a %m/%d")
		},
		workspaces: {
			number: opt(5),
		},
	},
}

let theme = baseTheme

export function loadTheme(newTheme: string) {
	const themeFile = `${GLib.get_user_config_dir()}/themes/${newTheme}.json`

	let theme = baseTheme

	print(`Setting theme to: ${themeFile}`)

	const values = JSON.parse(Utils.readFile(themeFile) || "{}")

	for (const tag in values) {
		try {
			eval(`theme.${tag}.value = values[tag]`)
		}
		catch (_) {
			print(tag, "is not in baseTheme")
		}
	}
	theme.themeFile.value = themeFile
}

export function getThemes(): Array<string> {
	let filesString = Utils.exec(`ls ${GLib.get_user_config_dir()}/themes`)
	return filesString.split("\n").map(t => t.split('.').slice(0, -1).toString())
}

export function saveCurrentTheme() {

}

globalThis["theme"] = theme
export default theme
