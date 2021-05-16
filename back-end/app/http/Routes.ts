/* eslint-disable */

import { Router, Request, Response } from 'express'
import Methods from '../interfaces/MethodEnum'
import Kernel from '../Kernel'

export default class Routes {
	/**
	 * @param { Router } router
	 */
	private static router: Router = Router()

	/**
	 * adds the route to application
	 *
	 * @param { string } method
	 * @param { Router } router
	 * @param { Function } controller
	 * @param { any } middlewares
	 * @returns { Router } router
	 * eslint-disable
	 */
	public static async addRoute(
		method: Methods,
		route: string,
		controller: Function,
		middlewares?: any
	): Promise<Router> {
		switch (method) {
			case Methods.GET:
				Routes.router.get(
					route,
					middlewares,
					(request: Request, response: Response) =>
						controller(request, response)
				)
				break
			case Methods.POST:
				Routes.router.post(
					route,
					middlewares,
					(request: Request, response: Response) =>
						controller(request, response)
				)
				break
			case Methods.UPDATE:
				Routes.router.put(
					route,
					middlewares,
					(request: Request, response: Response) =>
						controller(request, response)
				)
				break
			case Methods.DELETE:
				Routes.router.delete(
					route,
					middlewares,
					(request: Request, response: Response) =>
						controller(request, response)
				)
				break
		}

		return this.router
	}

	/**
	 * bootstraping the routes
	 *
	 * @param { string } path
	 */
	public async bootstrapRoutes(path: string): Promise<void> {
		Kernel.app.use(path, Routes.router)

		// loading routing
		require('../../routes/api')
	}
}
