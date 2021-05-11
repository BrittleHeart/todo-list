/* eslint-disable */

import MessageInterface from './MessageInterface'
import UserAuthenticationInterface from './UserAuthenticationInterface'

export default interface MailConfig {
	secure?: boolean
	pool?: boolean
	host: string
	port: number
	auth: UserAuthenticationInterface

	sendMail(
		message: MessageInterface,
		callback: (err: Error, info: any) => void
	): Promise<any>
}
