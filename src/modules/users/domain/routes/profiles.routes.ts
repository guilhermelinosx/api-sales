import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { isAuthenticated } from '@src/infra/server/middlewares/isAuthenticated'
import { ProfileController } from '../controllers/ProfileController'

export const profilesRouter = Router()
const profileController = new ProfileController()
profilesRouter.use(isAuthenticated)

profilesRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	profileController.show
)

profilesRouter.put(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		},
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			oldPassword: Joi.string(),
			newPassword: Joi.string().optional(),
			password_confirmation: Joi.string()

				.valid(Joi.ref('newPassword'))
				.when('newPassword', {
					is: Joi.exist(),
					then: Joi.required()
				})
		}
	}),
	profileController.update
)
