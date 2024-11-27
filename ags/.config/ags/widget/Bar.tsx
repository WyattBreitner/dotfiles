import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { bind, GLib, Variable } from "astal"
import Hyprland from "gi://AstalHyprland?version=0.1"
import Tray from "gi://AstalTray"

const ws = Array.from({ length: 7 }, (_, i) => i + 1)

const clock = Variable(GLib.DateTime.new_now_local()).poll(1000, () => GLib.DateTime.new_now_local())
const format = Variable("%-l:%M - %a %m/%d")
const time = Variable.derive([clock, format], (c, f) => c.format(f) || "")

function Workspaces(): JSX.Element {
	let hypr = Hyprland.get_default()

	return <box className="workspaces">
		{ws.map(i => (
			<label
				label={`${i}`}
				valign={Gtk.Align.CENTER}
				setup={(self) => {
					self.hook(hypr, "event", () => {
						self.toggleClassName("active", hypr.focusedWorkspace.id == i)
						self.toggleClassName("occupied", (hypr.get_workspace(i)?.get_clients().length || 0) > 0)
					})
				}}
			/>
		))}
	</box>
}

function Clock(): JSX.Element {
	return <button className={"bar-button time"}>
		{<label label={bind(time)} />}
	</button>
}

function SysTray(): JSX.Element {
	const tray = Tray.get_default()

	return <box>
		{bind(tray, "items").as(items => items.map(item => {
			if (item.iconThemePath) {
				App.add_icons(item.iconThemePath)
			}

			const menu = item.create_menu()

			return <button
				className={"bar-button"}
				tooltipMarkup={item.tooltipMarkup}
				onDestroy={() => menu?.destroy()}
				onClickRelease={self => {
					menu?.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
				}}>
				<icon gIcon={bind(item, "gicon")} />
			</button>
		}))}
	</box>
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
	return <window
		className="Bar"
		gdkmonitor={gdkmonitor}
		exclusivity={Astal.Exclusivity.EXCLUSIVE}
		anchor={Astal.WindowAnchor.TOP
			| Astal.WindowAnchor.LEFT
			| Astal.WindowAnchor.RIGHT}
		application={App}>
		<centerbox className={"bar"}
			css={"min-width: 2px; min-height: 2px;"}
			startWidget={
				<box>
					<Workspaces />
					<box expand />
				</box>
			}
			centerWidget={
				<box>
					<Clock />
				</box>
			}
			endWidget={
				<box>
					<box expand />
					<SysTray />
				</box>
			}

		/>
	</window>
}
