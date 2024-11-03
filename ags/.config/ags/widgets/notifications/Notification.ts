import icons from "lib/icons";
import { Notification } from "types/service/notifications";
import GLib from "types/@girs/glib-2.0/glib-2.0";

const time = (time: number, format = "%H:%M") => GLib.DateTime
	.new_from_unix_local(time)
	.format(format)

const NotificationIcon = ({ app_entry, app_icon, image }: Notification) => {
	if (image) {
		return Widget.Box({
			className: "icon img",
			hexpand: false,
			css: `
			   background-image: url("${image}");
			   background-size: cover;
                  	   background-repeat: no-repeat;
                           background-position: center;
                           min-width: 78px;
                           min-height: 78px;
			`
		})
	}

	let icon = icons.fallback.notification

	if (Utils.lookUpIcon(app_icon)) {
		icon = app_icon
	}

	if (Utils.lookUpIcon(app_entry || "")) {
		icon = app_entry || ""
	}

	return Widget.Box({
		className: "icon",
		css: `
       		     min-width: 78px;
          	     min-height: 78px;
        	`,
		child: Widget.Icon({
			icon,
			hexpand: true,
			vexpand: true
		})
	})
}

export default (notification: Notification) => {
	const content = Widget.Box({
		className: "centent",
		children: [
			NotificationIcon(notification),
			Widget.Box({
				vertical: true,
				hexpand: true,
				children: [
					Widget.Box({
						children: [
							Widget.Label({
								className: "title",
								justification: "left",
								xalign: 0,
								maxWidthChars: 24,
								wrap: true,
								truncate: "end",
								useMarkup: true,
								label: notification.summary.trim(),
								hexpand: true,
							}),
							Widget.Label({
								className: "time",
								label: time(notification.time),
							}),
							Widget.Button({
								className: "close-button",
								child: Widget.Icon("window-close-symbolic"),
								on_clicked: notification.close
							})]
					}),
					Widget.Label({
						className: "description",
						hexpand: true,
						xalign: 0,
						label: notification.body.trim()
					})
				]
			})
		]
	})

	const actions = notification.actions.length > 0 ? Widget.Box({
		children: notification.actions.map(a => Widget.Button({
			className: "action-button",
			on_clicked: () => notification.invoke(a.id),
			label: a.label
		}))
	}) : null


	const notif = Widget.EventBox({
		on_primary_click: notification.dismiss,
		child: Widget.Box({
			vertical: true,
			vexpand: false,
			children: actions ? [content, actions] : [content]
		})
	})

	return Widget.Box({
		className: `notification ${notification.urgency}`,
		child: notif
	})
}
