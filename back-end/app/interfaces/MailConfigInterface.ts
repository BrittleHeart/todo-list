/* eslint-disable */
import UserAuthenticationInterface from './UserAuthenticationInterface'

export default interface MailConfig {
	secure?: boolean
	pool?: boolean
	host: string
	port: number
	auth: UserAuthenticationInterface
}
