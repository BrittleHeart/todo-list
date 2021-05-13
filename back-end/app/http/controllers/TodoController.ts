import { QueryError, OkPacket } from 'mysql2'
import { Request, Response } from 'express'
import QueryBuilderProvider from '../../providers/QueryBuilder'
import Controller from './Controller'

class TodoController extends Controller {
	private queryBuilder: QueryBuilderProvider

	constructor(response: Response, request: Request) {
		super(response, request)

		this.queryBuilder = new QueryBuilderProvider()
	}

	/* eslint-disable */
	index(): void {
		const { queryBuilder } = this

		queryBuilder.select('Select * from todos', [], (err: QueryError | null, result: OkPacket | any) => {
			if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

			if (result.length === 0) return this.status(404).send('No todos found')

			return this.status(200).json({ result })
		})
	}
}

export default TodoController
