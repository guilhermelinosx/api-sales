import 'dotenv/config'
import 'express-async-errors'
import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { routes } from './routes'
import { AppError } from '@shared/errors/AppError'
import { datasource } from '@shared/typeorm'

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.code).json({
      status: 'error',
      message: error.message
    })

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
})

datasource
  .initialize()
  .then(() => {
    return app.listen(process.env.SERVER_PORT)
  })
  .catch(err => {
    return err
  })
