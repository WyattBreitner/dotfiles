import icons from "lib/icons";

const audio = await Service.import("audio")


const VolumeIcon = () => Widget.Icon({ icon: icons.audio.volume.medium })

const VolumeSlider = () => Widget.Slider({
	hexpand: true,
	drawValue: false,
	onChange: ({ value, dragging }) => {
		if (dragging) {
			audio["speaker"].volume = value
		}
	},
	value: audio["speaker"].bind("volume")
})

export default () => Widget.Box({
	children: [
		VolumeIcon(),
		VolumeSlider()
	]
})
