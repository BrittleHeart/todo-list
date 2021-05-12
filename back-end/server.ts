import dotenv from 'dotenv'
import Kernel from './app/Kernel'

// Loading environment variables
dotenv.config()

declare global {
	/* eslint-disable-next-line */
	function env(value: string, defaultVal: string | number): string | undefined
}

// bring up kernel loading
const application: Kernel = new Kernel()

// bootstraping the application
application.bootstrap()
