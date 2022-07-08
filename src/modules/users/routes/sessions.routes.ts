import { Router } from 'express'

import { celebrate, Joi, Segments } from 'celebrate'

import { SessionController } from '../controllers/SessionController'

export const sessionsRouter = Router()
const sessionController = new SessionController()

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create
)
