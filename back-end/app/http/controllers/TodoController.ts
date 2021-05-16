import { QueryError, OkPacket } from 'mysql2'
import { Request, Response } from 'express'
import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'
import QueryBuilderProvider from '../../providers/QueryBuilder'
import Controller from './Controller'
import ValidatorProvider from '../../providers/ValidatorProvider'

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

	/**
	 * Selects all data from todos table
	 *
	 * @returns void
	 */
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
		const name: string = this.input('name')
		const description: string = this.input('description') ? this.input('description') : ''
		const is_completed = this.input('is_completed') !== undefined ? this.input('is_completed') : false

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
						if (err) return this.status(500).send(`Something went wrong - ${err.message}`)

						return this.status(201).json({ name, description, is_completed })
					}
				)
			}
		)
	}

	/**
	 * Updates record with id
	 *
	 * @returns Promise<any>
	 */
	async update(): Promise<any> {
		const id: number = parseInt(this.queryParam('id'))
		const { validate } = this.validator
		const description = this.input('description') ? this.input('description') : ''
		const is_completed = this.input('is_completed') ? this.input('is_completed') : false

		this.shape = {
			description: yup
				.string()
				.trim()
				.matches(/[a-zA-Z0-9]{3,}/)
				.nullable(),
			is_completed: yup.bool().optional().default(false),
		}

		if (isNaN(id) || !id)
			return this.status(400).json({ status: 500, message: `id type found ${typeof id}, but number required` })

		try {
			await validate(this.shape, this.request.body)
		} catch (error) {
			return this.status(400).json({ status: error.name, message: error.message })
		}

		return this.queryBuilder.execute(
			'update todos set description = ?, is_completed = ? where id = ?',
			[description, is_completed, id],
			async (err: QueryError | null) => {
				if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

				return this.status(200).json({ description, is_completed })
			}
		)
	}

	/**
	 * Drops the todo from table with id
	 *
	 * @returns Response<Record<string, any>> | void
	 */
	delete(): Response<Record<string, any>> | void {
		const id: number = parseInt(this.queryParam('id'))

		if (!id || isNaN(id))
			return this.status(400).json({ status: 500, message: `id type found ${typeof id}, but number required` })

		this.queryBuilder.execute(
			'Select id from todos where id = ?',
			[id],
			(err: QueryError | null, result: OkPacket | any) => {
				if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

				if (result.length === 0)
					return this.status(400).json({ status: 400, message: `Todo with id = ${id} does not exist` })

				this.queryBuilder.execute('delete from todos where id = ?', [id], (err: QueryError | null) => {
					if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

					return this.status(200).json({ status: 200, message: `Record with id = ${id} has been deleted` })
				})
			}
		)
	}
}

export default TodoController
