import { WindowProps } from "types/widgets/window"
import { RevealerProps } from "types/widgets/revealer"
import type Gtk from "gi://Gtk?version=3.0"
import theme from "lib/theme"

type Child = WindowProps["child"]
type Transition = RevealerProps["transition"]

type PopupWindowProps = Omit<WindowProps, "name"> & {
	name: string,
	layout?: keyof ReturnType<typeof Layout>,
	transition?: Transition
}

const Padding = (name: string) => Widget.EventBox({
	hexpand: true,
	vexpand: true,
	canFocus: false,
	className: "popup-padding",
	child: Widget.Box({ css: "" }),
	setup: w => w.on("button-press-event", () => App.toggleWindow(name))
})

const PopupRevealer = (
	name: string,
	child: Child,
	transition: Transition = "slide_down"
) => Widget.Box(
	{ css: "padding: 1px;" },
	Widget.Revealer({
		transition,
		child: Widget.Box({
			className: "popup-revealer",
			child
		}),
		transitionDuration: theme.transition.bind(),
		setup: self => self.hook(App, (_, wname, visable) => {
			if (wname === name) {
				self.reveal_child = visable
			}
		})
	})
)

const Layout = (name: string, child: Child, transition: Transition) => ({
	"center": () => Widget.CenterBox({},
		Padding(name),
		Widget.CenterBox(
			{ vertical: true },
			Padding(name),
			PopupRevealer(name, child, transition),
			Padding(name)
		),
		Padding(name)),
	"top": () => Widget.Box({},
		Padding(name),
		Widget.Box(
			{
				hexpand: false,
				vertical: true
			},
			PopupRevealer(name, child, transition),
			Padding(name),
		),
		Padding(name)),
})

export default ({
	name,
	child,
	transition,
	layout = "center",
	exclusivity = "ignore",
	...props
}: PopupWindowProps) => Widget.Window<Gtk.Widget>({
	name,
	className: "popup-window",
	visible: false,
	exclusivity,
	layer: "top",
	anchor: ["top", "left", "right", "bottom"],
	child: Layout(name, child, transition)[layout](),
	setup: w => w.keybind("Escape", () => App.closeWindow(name)),
	...props
})
