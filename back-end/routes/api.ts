/**
 * main routing file. Here you can add / modify already existing routes.
 * Routes class has
 *
 * @see Routes.addRoute()
 *
 * that you can use to scale your next best idea!
 */

import { Request, Response } from 'express'
import TodoController from '../app/http/controllers/TodoController'
import UserController from '../app/http/controllers/UserController'
import Routes from '../app/http/Routes'
import Methods from '../app/interfaces/MethodEnum'

Routes.addRoute(
	Methods.GET,
	'/users',
	(req: Request, res: Response) => {
		const user: UserController = new UserController(req, res)

		return user.index()
	},
	[]
)

Routes.addRoute(
	Methods.GET,
	'/todos',
	(req: Request, res: Response) => {
		const todo: TodoController = new TodoController(res, req)

		return todo.index()
	},
	[]
)
