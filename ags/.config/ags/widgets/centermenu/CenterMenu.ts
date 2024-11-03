import SystemPopupWindow from "widgets/SystemPopupWindow";
import NotificationColumn from "./NotificationColumn";
import QuickActions from "./QuickActions";
import Calendar from "widgets/calendar/Calendar";

import Volume from "./Volume"


export default () => SystemPopupWindow({
	name: "centerMenu",
	exclusivity: "exclusive",
	layout: "top",

	child: Widget.Box({
		className: "center-menu",
		vexpand: false,
		children: [
			NotificationColumn(),
			Widget.Separator({ orientation: 1 }),
			Widget.Box({
				vertical: true,
				children: [
					QuickActions(),
					Widget.Separator(),
					Volume(),
					Widget.Separator(),
					Calendar()
				]
			})
		]
	})

})
