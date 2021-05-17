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
import { verifyJWTToken } from '../app/http/middlewares/JWT.middleware'
import Routes from '../app/http/Routes'
import Methods from '../app/interfaces/MethodEnum'

/* ------------------------------------------

TODOS routes

------------------------------------------ */
Routes.addRoute(
	Methods.GET,
	'/todos',
	(req: Request, res: Response) => {
		const todo: TodoController = new TodoController(res, req)

		return todo.index()
	},
	[verifyJWTToken]
)

Routes.addRoute(
	Methods.GET,
	'/todos/:id',
	(req: Request, res: Response) => {
		const todo: TodoController = new TodoController(res, req)

		return todo.show()
	},
	[verifyJWTToken]
)

Routes.addRoute(
	Methods.POST,
	'/todos',
	async (req: Request, res: Response) => {
		const todo: TodoController = new TodoController(res, req)

		return await todo.create()
	},
	[verifyJWTToken]
)

Routes.addRoute(
	Methods.UPDATE,
	'/todos/:id',
	async (req: Request, res: Response) => {
		const todo: TodoController = new TodoController(res, req)

		return await todo.update()
	},
	[verifyJWTToken]
)

Routes.addRoute(
	Methods.DELETE,
	'/todos/:id',
	(req: Request, res: Response) => {
		const todo: TodoController = new TodoController(res, req)

		return todo.delete()
	},
	[verifyJWTToken]
)

/* ------------------------------------------

Users routes

------------------------------------------ */
Routes.addRoute(
	Methods.GET,
	'/auth/login',
	(req: Request, res: Response) => {
		const users: UserController = new UserController(req, res)

		return users.login()
	},
	[]
)

Routes.addRoute(
	Methods.POST,
	'/auth/register',
	(req: Request, res: Response) => {
		const users: UserController = new UserController(req, res)

		return users.register()
	},
	[verifyJWTToken]
)
