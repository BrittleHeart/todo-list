import { QueryError, OkPacket } from 'mysql2'
import { Request, Response } from 'express'
import QueryBuilderProvider from '../../providers/QueryBuilder'
import Controller from './Controller'
import ValidatorProvider from '../../providers/ValidatorProvider'
import * as yup from 'yup'

class TodoController extends Controller {
	private queryBuilder: QueryBuilderProvider
	private validator: ValidatorProvider

	constructor(response: Response, request: Request) {
		super(response, request)

		this.queryBuilder = new QueryBuilderProvider()
		this.validator = new ValidatorProvider(request, response)
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
		const { name, description, is_completed } = this.request.body

		const shape = {
			name: yup
				.string()
				.min(3)
				.trim()
				.max(255)
				.matches(/[a-zA-Z0-9]{3,}/)
				.required(),
			description: yup.string().min(10).trim().optional(),
			is_completed: yup.bool().optional(),
		}

		try {
			await validate(shape, this.request.body)
		} catch (error) {
			return this.status(400).json({ status: error.name, message: error.message })
		}

		if (!description) {
			this.queryBuilder.execute(
				'Insert into todos (name, is_completed) values (?, ?)',
				[name, is_completed],
				(err: QueryError | null, result: OkPacket | any) => {
					if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

					return this.status(201).json({ result })
				}
			)
		} else if (!is_completed) {
			this.queryBuilder.execute(
				'Insert into todos (name, description) values (?,?)',
				[name, description],
				(err: QueryError | null, result: OkPacket | any) => {
					if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

					return this.status(201).json({ result })
				}
			)
		} else {
			this.queryBuilder.execute(
				'Insert into todos (name, description, is_completed) values (?,?,?)',
				[name, description, is_completed],
				(err: QueryError | null, result: OkPacket | any) => {
					if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

					return this.status(201).json({ result })
				}
			)
		}
	}
}

export default TodoController
