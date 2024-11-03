import GLib from "types/@girs/glib-2.0/glib-2.0";


export const clock = Variable(GLib.DateTime.new_now_local(), {
	poll: [1000, () => GLib.DateTime.new_now_local()]
})

