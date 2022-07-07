import 'express-async-errors'
import 'reflect-metadata'
import { errors } from 'celebrate'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { router } from './routes'
import { AppError } from '@shared/errors/AppError'

export const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.use(errors())
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.code).json({
      status: 'error',
      message: error.message,
    })
  }
  console.log(error)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})
