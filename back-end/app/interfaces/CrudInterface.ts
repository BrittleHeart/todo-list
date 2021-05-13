/* eslint-disable */
import { FieldPacket, OkPacket, Query, QueryError, RowDataPacket } from 'mysql2'

export default interface CrudInterface {
	select<T extends OkPacket | OkPacket[] | RowDataPacket[]>(
		values?: any | any[] | { [param: string]: any },
		callback?: (err: QueryError | null, result: T, fields: FieldPacket[]) => void
	): Query | Error

	execute<T extends OkPacket | OkPacket[] | RowDataPacket[]>(
		alues?: any | any[] | { [param: string]: any },
		callback?: (err: QueryError | null, result: T, fields: FieldPacket[]) => void
	): Query | Error
}
