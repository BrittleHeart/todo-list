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
import Mailer from '../config/mail'

const newMail = new Mailer('', 446)

Routes.addRoute(Methods.GET, '/users', (req: Request, res: Response) => res.send({ hello: 'me' }))

Routes.addRoute(Methods.POST, '/users', async (req: Request, res: Response) => {
	await newMail.sendMail({
		subject: 'dadsas',
		from: 'asdasdasd',
		to: 'dasdasdasd',
		text: 'asdad',
	})

	res.send('Mail sent')
})
