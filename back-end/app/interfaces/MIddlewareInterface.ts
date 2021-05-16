/* eslint-disable */
export default interface MiddlewareInterface {
	/**
	 * loads routing system
	 *
	 * @param { Record<string, any> } middleware
	 * @return void
	 */
	loadMiddleware(middleware: Record<string, any> | Function): void
}
