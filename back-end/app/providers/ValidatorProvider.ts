import * as yup from 'yup'
import { Request, Response } from 'express'
import Controller from '../http/controllers/Controller'
import { AssertsShape } from 'yup/lib/object'

export default class ValidatorProvider extends Controller {
	constructor(response: Request, request: Response) {
		super(request, response)
	}

	/**
	 * Validates request parameters
	 *
	 * @returns Promise<AssertsShape<any>>
	 */
	async validate(schema: any, data: Request): Promise<AssertsShape<any>> {
		const shape = yup.object().shape(schema)

		return await shape.validate(data)
	}
}
