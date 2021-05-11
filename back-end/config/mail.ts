import * as nodemailer from 'nodemailer'
import MailConfigInterface from '../app/interfaces/MailConfigInterface'
import MessageInterface from '../app/interfaces/MessageInterface'
import UserAuthenticationInterface from '../app/interfaces/UserAuthenticationInterface'

export type SentMessageInfo = any

export default class Mailer {
	private secure?: boolean | undefined
	private pool?: boolean | undefined
	private host: string
	private port: number
	private auth: UserAuthenticationInterface

	constructor(host: string, port: number) {
		this.host = host
		this.port = port

		this.auth = {
			user: process.env.MAIL_USER!,
			pass: process.env.MAIL_PASS!,
		}

		this.secure = process.env.MAIL_SECURE ? true : false
		this.pool = process.env.MAIL_POOL ? true : false
	}

	/**
	 * sends mail
	 *
	 * @param { MessageInterface } message
	 * @param { Function } callback
	 * @return void
	 */
	/* eslint-disable no-unused-vars */
	sendMail(message: MessageInterface, callback?: (err: Error | null, info: Record<string, any>) => void): void {
		const transportConfig: MailConfigInterface = {
			host: this.host,
			port: this.port,
			secure: this.secure,
			auth: this.auth,
		}

		callback
			? nodemailer.createTransport(transportConfig).sendMail(message, callback)
			: nodemailer.createTransport(transportConfig).sendMail(message)
	}
}
