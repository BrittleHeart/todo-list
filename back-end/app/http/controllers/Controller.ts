import { Response, Request } from 'express'
export default abstract class Controller {
	protected response: Response
	protected request: Request

	/**
	 * Controller constructor
	 *
	 * @constructor
	 * @param { Response } response
	 * @param { Request } request
	 */
	constructor(response: Response, request: Request) {
		this.response = response
		this.request = request
	}

	/**
	 * Redirects user to path
	 *
	 * @param { string } path
	 * @returns void
	 */
	protected redirect(path: string): void {
		this.response.redirect(path)
	}

	/**
	 * Sets status code
	 *
	 * @param { number } code
	 * @returns Response
	 */
	protected status(code: number): Response {
		return this.response.status(code)
	}

	/**
	 * Gets request body param
	 *
	 * @param { T } input
	 * @returns
	 */
	protected input<T>(input: T | string | number): T {
		const { body } = this.request

		return body[input]
	}

	/**
	 * Gets query parameters
	 *
	 * @param { string } param
	 * @returns
	 */
	protected queryParam(param: string): string {
		const { params } = this.request

		return params[param]
	}
}
