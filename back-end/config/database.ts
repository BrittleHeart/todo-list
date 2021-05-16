import { createConnection, Connection, ConnectionOptions } from 'mysql2'

export default abstract class Database {
	private host: string | undefined
	private port: string | undefined
	private database: string | undefined
	private username: string | undefined
	private password: string | undefined
	protected connection: Connection

	constructor() {
		this.host = env('MYSQL_HOST', '127.0.0.1')
		this.port = env('MYSQL_PORT', 3306)
		this.username = env('MYSQL_USER', '')
		this.password = env('MYSQL_PASSWORD', '')
		this.database = env('MYSQL_DATABASE', '')

		const config: ConnectionOptions = {
			host: this.host,
			port: parseInt(this.port!),
			user: this.username,
			password: this.password,
			database: this.database,
		}
		this.connection = createConnection(config)
	}
}
