import { QueryError, OkPacket } from 'mysql2'
import { Request, Response } from 'express'
import QueryBuilderProvider from '../../providers/QueryBuilder'
import Controller from './Controller'
import ValidatorProvider from '../../providers/ValidatorProvider'
import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'

class TodoController extends Controller {
	private queryBuilder: QueryBuilderProvider
	private validator: ValidatorProvider
	private shape: ObjectShape

	constructor(response: Response, request: Request) {
		super(response, request)

		this.queryBuilder = new QueryBuilderProvider()
		this.validator = new ValidatorProvider(request, response)

		// shape of required request
		this.shape = {
			name: yup
				.string()
				.min(3)
				.trim()
				.max(255)
				.matches(/[a-zA-Z0-9]{3,}/)
				.required(),
			description: yup
				.string()
				.trim()
				.matches(/[a-zA-Z0-9]{3,}/)
				.nullable(),
			is_completed: yup.bool().optional().default(false),
		}
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

	/**
	 * Shows the todo with id
	 *
	 * @returns void | Response<Error>
	 */
	show(): void | Response<Error> {
		const id: number = parseInt(this.queryParam('id'))

		if (isNaN(id)) return this.status(500).json({ message: 'Invalid id type value' })

		this.queryBuilder.execute(
			'Select * from todos where id = ?',
			[id],
			(err: QueryError | null, result: OkPacket | any) => {
				if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

				if (result.length === 0) return this.status(404).send(`Todo with id = ${id} does not exist`)

				return this.status(200).json({ result })
			}
		)
	}

	/**
	 * Creates new todo
	 *
	 * @returns Promise<any>
	 */
	async create(): Promise<any> {
		const { validate } = this.validator

		// request's vars
		const name: string = escape(this.input('name'))
		const description: string = this.input('description') ? escape(this.input('description')) : ''
		const is_completed = this.input('is_completed') !== undefined ? escape(this.input('is_completed')) : false

		return this.queryBuilder.execute(
			'select name from todos where name = ?',
			[name],
			async (err: QueryError | null, result: OkPacket | any) => {
				// looking for errors
				if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

				// check if record has been found
				if (result.length > 0)
					return this.status(400).json({
						status: 400,
						message: `Could not create todo with name = ${name}. The record already exists`,
					})

				// record validation
				try {
					await validate(this.shape, this.request.body)
				} catch (error) {
					return this.status(400).json({ status: error.name, message: error.message })
				}

				// excetuing the query
				this.queryBuilder.execute(
					'Insert into todos (name, description, is_completed) values (?,?,?)',
					[name, description, is_completed],
					(err: QueryError | null) => {
						if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

						return this.status(201).json({ name, description, is_completed })
					}
				)
			}
		)
	}
}

export default TodoController
