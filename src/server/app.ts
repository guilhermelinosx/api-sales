import 'express-async-errors'
import 'reflect-metadata'
import '@src/utils/module-alias'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { AppError } from '@src/server/errors/AppError'
import { errors } from 'celebrate'
import { routes } from './routes'
import { app } from './server'

app.use(express.json())
app.use(errors())
app.use(cors())
app.use(routes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return res.status(error.code).json({
			status: 'error',
			message: error.message
		})
	}

	return res.status(500).json({
		status: 'error',
		message: 'Internal server error'
	})
})
