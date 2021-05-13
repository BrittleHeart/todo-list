import { QueryError, RowDataPacket } from 'mysql2'
import { Request, Response } from 'express'
import QueryBuilderProvider from '../../providers/QueryBuilder'
import Controller from './Controller'

export default class UserController extends Controller {
	private queryBuilder: QueryBuilderProvider

	/**
	 *
	 * @param { Request } request
	 * @param { Response } response
	 */
	constructor(request: Request, response: Response) {
		super(response, request)

		this.queryBuilder = new QueryBuilderProvider()
	}

	/**
	 * Selects all data
	 *
	 * @returns void
	 */
	public index(): void {
		this.queryBuilder.select('Select * from users', [], (err: QueryError | null, result: RowDataPacket[]) => {
			if (err) {
				return this.status(400).send(`Something went wrong - ${err.message}`)
			}

			if (result.length === 0) return this.status(404).send('No users found}')

			return this.status(200).send(result)
		})
	}
}
