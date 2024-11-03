import icons from "lib/icons"
import theme from "lib/theme"
import { Notification } from "types/service/notifications"
import Notif from "widgets/notifications/Notification"

const notifications = await Service.import("notifications")


const NotificationRevealer = (n: Notification, index: number) => Widget.Revealer({
	transitionDuration: theme.transition.value * (1 + (index + 1 / 10)),
	transition: "slide_down",
	reveal_child: true,
	child: Notif(n)
})

const ClearButton = () => Widget.Button({
	className: "clear-button",
	on_clicked: notifications.clear,
	child: Widget.Icon({ icon: icons.trash.empty })
})

const Header = () => Widget.Box({
	className: "header",
	children: [
		Widget.Label({ label: "Notifications", hexpand: true, xalign: 0 }),
		ClearButton(),
	]
})



const NotificationList = () => {
	const notifs: Map<number, ReturnType<typeof NotificationRevealer>> = new Map
	const context = Widget.Box({
		vertical: true,
		children: notifications.notifications.map((n, i) => {
			const r = NotificationRevealer(n, i)
			notifs.set(n.id, r)
			return r
		})
	})

	function removeNotif(_: unknown, id: number) {
		const r = notifs.get(id)
		if (r) {
			r.reveal_child = false
			Utils.timeout(theme.transition.value, () => {
				r.destroy()
				notifs.delete(id)
			})
		}
	}

	return context
		.hook(notifications, removeNotif, "closed")
		.hook(notifications, (_, id: number) => {
			if (id !== undefined) {
				if (notifs.has(id)) {
					removeNotif(null, id)
				}

				const n = notifications.getNotification(id)!

				const r = NotificationRevealer(n, notifs.size)
				notifs.set(id, r)
				context.children = [r, ...context.children]
			}
		}, "notified")

}

export default () => Widget.Box({
	vertical: true,
	className: "notifications",
	css: theme.notifications.width.bind().as(w => `min-width: ${w}px`),
	children: [
		Header(),
		Widget.Scrollable({
			vexpand: true,
			hscroll: "never",
			child: NotificationList()
		})
	]
})
