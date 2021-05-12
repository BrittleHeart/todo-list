/**
 * global helper function for taking environment variables
 *
 * @param { string } value
 * @param { string | number } defaultVal
 * @returns string | undefined
 */
const _global = global /* node */ as any
_global.env = function (value: string, defaultVal: string | number): string | number | undefined {
	return process.env[value] ? process.env[value] : defaultVal
}

export default _global
