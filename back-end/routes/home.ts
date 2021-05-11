import { Router, Request, Response } from 'express'

export default {
	/**
	 * extracts homepage urls
	 *
	 * @returns { Router } router
	 */
	extractHomePages: () => {
		const router: Router = Router()

		router.get('/', (request: Request, response: Response) => {
			response.send('Works')
		})

		return { router }
	},
}
