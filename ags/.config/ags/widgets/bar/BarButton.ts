
import { ButtonProps } from "types/widgets/button"

export default ({ child, setup, ...rest }: ButtonProps) => Widget.Button({
	class_name: "bar-button",
	child: Widget.Box({ child }),
	setup: self => {
		self.toggleClassName("bar-button")
		if (setup) {
			setup(self)
		}
	},
	...rest
})
