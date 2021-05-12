/**
 * main routing file. Here you can add / modify already existing routes.
 * Routes class has
 *
 * @see addRoute()
 *
 * that you can use to scale your next best idea!
 */

import { Request, Response } from 'express'
import { FieldPacket, QueryError } from 'mysql2'
import Routes from '../app/http/Routes'
import Methods from '../app/interfaces/MethodEnum'
import QueryBuilderProvider from '../app/providers/QueryBuilder'

const queryBuilder = new QueryBuilderProvider()

Routes.addRoute(Methods.GET, '/users', (req: Request, res: Response) => {
	queryBuilder.select('select * from users', [], (err: QueryError | null, result: any, fields: FieldPacket[]) => {
		if (err) throw new Error(err.message)

		return res.send({ result, fields })
	})
	res.send('<h1>Youre close to me</h1>')
})
