import dotenv from 'dotenv'
import Kernel from './app/Kernel'

// Loading environment variables
dotenv.config()

declare global {
	/* eslint-disable-next-line */
	function env(value: string, defaultVal: string | number): string | undefined
}

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

const PORT: number | any = process.env.PORT || process.env.APP_PORT

// bring up kernel loading
const application: Kernel = new Kernel(PORT)

// global require('./utils')

// loading routing
require('./routes/api')

// bootstraping the application
application.bootstrap()
