import 'express-async-errors'
import 'reflect-metadata'
import 'dotenv/config'
import '@src/util/module-alias'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { AppError } from '@src/infra/errors/AppError'
import { errors } from 'celebrate'
import { routes } from './routes'
import { datasource } from '../typeorm'

export const app = express()
app.use(errors())
app.use(express.json())
app.use(cors())
app.use(routes)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return res.status(error.code).json({
			status: 'error',
			message: error.message
		})
	}
	console.error(error)
	return res.status(500).json({
		status: 'error',
		message: 'Internal server error'
	})
})

datasource.initialize().then(() => {
	app.listen(3000, () => {
		console.log('Server Run')
	})
})
