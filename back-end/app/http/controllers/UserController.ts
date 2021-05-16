import { OkPacket, QueryError } from 'mysql2'
import { Request, Response } from 'express'
import QueryBuilderProvider from '../../providers/QueryBuilder'
import Controller from './Controller'
import ValidatorProvider from '../../providers/ValidatorProvider'
import { compare, genSalt, hash } from 'bcrypt'
import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'
import { sign } from 'jsonwebtoken'

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

		const email: string = this.input('email')
		const password: string = this.input('password')

		if (!email || !password)
			return this.status(400).json({ status: 400, message: 'E-mail and password values are required' })

		try {
			this.shape = {
				email: yup.string().email().trim().min(3).max(255).required(),
				password: yup.string().min(10).max(255).trim().required(),
			}

			await validate(this.shape, this.request.body)
		} catch (error) {
			return this.status(400).json({ status: error.name, message: error.message })
		}

		queryBuilder.select(
			'select nick, email, password from users where email = ?',
			[email],
			async (err: QueryError | null, result: OkPacket | any) => {
				if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

				if (result.length === 0)
					return this.status(404).json({ status: 404, message: `No user found with email = ${email}` })

				const matches: boolean = await compare(password, result[0].password)

				if (email !== result[0].email || !matches)
					return this.status(401).json({ status: 401, message: 'Unauthorized access' })

				const token = sign({ nick: result[0].nick, email }, env('JWT_SECURE_KEY', '')!, { expiresIn: '2 days' })

				return this.status(200).json({ token })
			}
		)
	}

	/**
	 * Registers users
	 *
	 * @returns Promise<any>
	 */
	async register(): Promise<any> {
		const { queryBuilder } = this
		const { validate } = this.validator

		const nick: string = this.input('nick')
		const email: string = this.input('email')
		let password: string = this.input('password')

		if (!nick || !email || !password)
			return this.status(400).json({ status: 400, message: 'Nick, E-mail and password values are required' })

		try {
			await validate(this.shape, this.request.body)
		} catch (error) {
			return this.status(400).json({ status: error.name, message: error.message })
		}

		queryBuilder.execute(
			'Select email from users where email = ?',
			[email],
			async (err: QueryError | null, result: OkPacket | any) => {
				if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

				if (result.length > 0)
					return this.status(400).json({ status: 400, message: `User with email = ${email} already exists` })

				const salt = await genSalt(10)
				if (salt.length === 0) return this.status(500).json({ status: 500, message: 'Could not generate salt' })

				const password_hashed = await hash(password, salt)
				if (password_hashed.length === 0)
					return this.status(500).json({ status: 500, message: 'Could not generate salt' })

				password = password_hashed

				queryBuilder.execute(
					'Insert into users (nick, email, password) values (?, ?, ?)',
					[nick, email, password],
					(err: QueryError | null) => {
						if (err) return this.status(400).send(`Something went wrong - ${err.message}`)

						return this.status(201).json({ nick, email })
					}
				)
			}
		)
	}
}
