/* eslint-disable */
import { Application } from 'express'
import MiddlewareInterface from '../../interfaces/MIddlewareInterface'
import Kernel from '../Kernel'

export default class Middleware implements MiddlewareInterface {
	/**
	 * @param { Application } application
	 */
	private app: Application = Kernel.app

	loadMiddleware(middleware: any): void {
		this.app.use(middleware)
	}
}
