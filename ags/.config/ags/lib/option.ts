import { Variable } from "resource:///com/github/Aylur/ags/variable.js"

export class Opt<T = unknown> extends Variable<T> {
	static { Service.register(this) }

	constructor(value: T) {
		super(value)
		this.value = value
	}

	tag = ""

	toString() { return `${this.value}` }
}

export const opt = <T>(value: T) => new Opt(value)

function getOptions(object: object, path = ""): Opt[] {
	return Object.keys(object).flatMap(key => {
		const obj: Opt = object[key]
		const tag = path ? path + "." + key : key

		if (obj instanceof Variable) {
			obj.tag = tag
			return obj
		}

		if (typeof obj === "object") {
			return getOptions(obj, tag)
		}

		return []
	})
}

export function saveOptions<T extends object>(optionsFile: string, object: T) {

	Utils.ensureDirectory(optionsFile.split("/").slice(0, -1).join("/"))

	const values = getOptions(object).reduce((obj, { tag, value }) => ({ [tag]: value, ...obj }), {})

	Utils.writeFileSync(JSON.stringify(values), optionsFile)
}
