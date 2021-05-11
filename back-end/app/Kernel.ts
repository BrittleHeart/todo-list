/* eslint-disable */

import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import Middleware from './http/middlewares/Middleware'
import Routes from './http/Routes'

export default class Kernel {
	/**
	 * static express application
	 *
	 * @param { Application } app
	 */
	public static app: Application = express()
	public middlewares: Middleware
	public routes: Routes
	private port?: number

	/**
	 * Kernel constructor
	 *
	 * @constructor
	 * @param { number } port - Declates for which port should be opened
	 */
	constructor(port?: number) {
		this.port = port
		this.middlewares = new Middleware()
		this.routes = new Routes()
	}

	/**
	 *
	 * Serves the app
	 *
	 * @param { any } callback for potencial development
	 */
	private async serve(callback?: any | undefined): Promise<void> {
		if (process.env.NODE_ENV === 'development')
			this.port ? Kernel.app.listen(this.port, () => callback) : Kernel.app.listen(3500, () => callback)
		else this.port ? Kernel.app.listen(this.port) : Kernel.app.listen(3500)
	}

	/**
	 * Bootstraps the whole application
	 *
	 * @return void
	 */
	public bootstrap(): void {
		const { middlewares } = this
		const { DEBUG } = process.env

		middlewares.loadMiddleware(express.json())
		middlewares.loadMiddleware(cors())
		middlewares.loadMiddleware(helmet())

		// sets logging, depends on current environment (development / production)
		DEBUG ? middlewares.loadMiddleware(morgan('dev')) : middlewares.loadMiddleware(morgan('tiny'))

		this.routes.bootstrapRoutes('/api/v1')
		this.serve(console.log(`server started here http://localhost:${this.port}`))
	}
}
