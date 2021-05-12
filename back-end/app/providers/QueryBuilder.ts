import Database from '../../config/database'
import { FieldPacket, OkPacket, Query, QueryError, RowDataPacket } from 'mysql2'
import CrudInterface from '../interfaces/CrudInterface'

export default class QueryBuilderProvider extends Database implements CrudInterface {
	constructor() {
		super()
	}

	/**
	 *
	 * @param { undefined | any[] | { [param: string]: any } } values
	 * @param { Function } callback
	 * @returns Query | Error
	 */

	/* eslint-disable-next-line */
	select<T extends OkPacket | OkPacket[] | RowDataPacket[]>(
		query: string,
		values?: undefined | any[] | { [param: string]: any },
		/* eslint-disable no-unused-vars */
		callback?: (err: QueryError | null, result: T, fields: FieldPacket[]) => void
	): Query | Error {
		return this.connection.query(query, values, callback)
	}
}
