import { Router } from 'express'

import { celebrate, Joi, Segments } from 'celebrate'

import { SessionController } from '../controllers/SessionController'

export const sessionRouter = Router()
const sessionController = new SessionController()

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create
)
