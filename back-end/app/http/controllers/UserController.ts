import { OkPacket, QueryError } from 'mysql2'
import { Request, Response } from 'express'
import QueryBuilderProvider from '../../providers/QueryBuilder'
import Controller from './Controller'
import ValidatorProvider from '../../providers/ValidatorProvider'
import { compare } from 'bcrypt'
import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'

export default class UserController extends Controller {
	private queryBuilder: QueryBuilderProvider
	private shape: ObjectShape
	private validator: ValidatorProvider

	/**
	 *
	 * @param { Request } request
	 * @param { Response } response
	 */
	constructor(request: Request, response: Response) {
		super(response, request)

		this.queryBuilder = new QueryBuilderProvider()
		this.validator = new ValidatorProvider(request, response)
		this.shape = {
			nick: yup
				.string()
				.min(3)
				.max(40)
				.trim()
				.required()
				.matches(/[a-zA-Z0-9]/),
			email: yup.string().email().trim().min(3).max(255).required(),
			password: yup.string().min(10).max(255).trim().required(),
		}
	}

	/**
	 * Logging in users
	 *
	 * @returns Promise<any>
	 */
	async login(): Promise<any> {
		const { queryBuilder } = this
		const { validate } = this.validator

		const email = this.input('email')
		const password = this.input('password')

		if (!email || !password)
			return this.status(400).json({ status: 400, message: 'E-mail and password values are required' })

		queryBuilder.execute(
			'select email, password from users where email = ?',
			[email],
			async (err: QueryError | null, result: OkPacket | any) => {
				if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

				if (result.length === 0)
					return this.status(404).json({ status: 404, message: `No user found with email = ${email}` })

				const matches: boolean = await compare(password, result[password])

				if (email !== result[email] || !matches)
					return this.status(401).json({ status: 401, message: 'Unauthorized access' })

				try {
					this.shape = {
						email: yup.string().email().trim().min(3).max(255).required(),
						password: yup.string().min(10).max(255).trim().required(),
					}

					await validate(this.shape, this.request.body)
				} catch (error) {
					return this.status(400).json({ status: error.name, message: error.message })
				}

				return this.status(200).json({ status: 200, message: 'Logged in' })
			}
		)
	}
}
