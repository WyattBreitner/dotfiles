

/**
 * @returns [start...length]
 */
export function range(length: number, start = 1) {
	return Array.from({ length }, (_, i) => i + start)
}

/**
 * @returns execAsync(["bash", "-c", cmd])
 */
export async function bash(strings: TemplateStringsArray | string, ...values: unknown[]) {
	const cmd = typeof strings === "string" ? strings : strings
		.flatMap((str, i) => str + `${values[i] ?? ""}`)
		.join("")

	return Utils.execAsync(["bash", "-c", cmd]).catch(err => {
		console.error(cmd, err)
		return ""
	})
}
