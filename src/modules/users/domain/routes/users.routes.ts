import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { UserController } from '../controllers/UserController'
import { isAuthenticated } from '@src/server/middlewares/isAuthenticated'

export const usersRouter = Router()
const userController = new UserController()

usersRouter.get('/', isAuthenticated, userController.index)

usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required()
		}
	}),
	userController.create
)
