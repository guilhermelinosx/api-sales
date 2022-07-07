import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { UserController } from '../controllers/UserController'
import { isAuthenticated } from '@shared/middlewares/isAuthenticated'

export const userRouter = Router()
const userController = new UserController()

userRouter.get('/', isAuthenticated, userController.index)

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create
)
