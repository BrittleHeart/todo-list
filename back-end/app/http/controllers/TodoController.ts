import { QueryError, Query, FieldPacket } from 'mysql2'
import CrudInterface from '../../interfaces/CrudInterface'
import Controller from './Controller'

class TodoController extends Controller implements CrudInterface {
	/* eslint-disable */
	select(values?: any, callback?: (err: QueryError | null, result: any, fields: FieldPacket[]) => void): Error | Query {
		throw new Error('Method not implemented.')
	}
}

export default TodoController
