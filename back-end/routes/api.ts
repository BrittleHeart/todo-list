/**
 * main routing file. Here you can add / modify already existing routes.
 * Routes class has
 *
 * @see addRoute()
 *
 * that you can use to scale your next best idea!
 */

import { Request, Response } from 'express'
import Routes from '../app/http/Routes'
import Methods from '../app/interfaces/MethodEnum'

Routes.addRoute(Methods.GET, '/users', (req: Request, res: Response) =>
	res.send({ hello: 'me' })
)

Routes.addRoute(Methods.POST, '/users', (req: Request, res: Response) => {
	res.status(201).send({ hello: 'again for POST' })
})
