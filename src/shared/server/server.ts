import 'dotenv/config'
import 'express-async-errors'
import 'reflect-metadata'
import { errors } from 'celebrate'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { router } from './routes'
import { AppError } from '@shared/errors/AppError'
import { datasource } from '@shared/typeorm'

const app = express()

app.use(express.json())
app.use(cors())
app.use(errors())
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.code).json({
      status: 'error',
      message: error.message,
    })

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})
app.use(router)

datasource
  .initialize()
  .then(() => {
    return app.listen(process.env.SERVER_PORT)
  })
  .catch(err => {
    return err
  })
