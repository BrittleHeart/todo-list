import express, { Application, Router, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import homePage from './routes/home'

dotenv.config()

const app: Application = express()
app.use(cors())
app.use(helmet())

const routerv2: Router = Router()
routerv2.get('/users', (request: Request, response: Response) =>
	response.send('Uzytkownicy')
)

app.use('/', homePage.extractHomePages().router)
app.use('/api/v1', routerv2)

app.listen(3500, () =>
	console.log(`Server started here -> http://todo-list:${3500}`)
)
