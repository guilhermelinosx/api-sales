import { AppError } from '@shared/errors/AppError'
import { routes } from '@shared/infra/http/routes/index'
import { datasource } from '@shared/infra/typeorm'
import { errors } from 'celebrate'
import cors from 'cors'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import 'reflect-metadata'

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
	app.listen(process.env.SERVER_PORT || 3000, () => {
		console.log('Server Run')
	})
})
