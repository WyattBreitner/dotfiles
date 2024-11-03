import "lib/globals"
import "style/style"
import bar from "widgets/bar/Bar"
import theme, { getThemes } from "lib/theme"
import ThemeMenu from "widgets/themeMenu/ThemeMenu"
import Calendar from "widgets/calendar/Calendar"
import CenterMenu from "widgets/centermenu/CenterMenu"

globalThis["theme"] = theme

getThemes()
App.config({
	windows: [
		bar(),
		CenterMenu(),
		ThemeMenu()
	]
})

