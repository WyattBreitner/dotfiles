import GLib from "types/@girs/glib-2.0/glib-2.0"

declare global {
	const TMP: string
}

Object.assign(globalThis, {
	TMP: `${GLib.get_tmp_dir()}/ags`
})

Utils.ensureDirectory(TMP)
