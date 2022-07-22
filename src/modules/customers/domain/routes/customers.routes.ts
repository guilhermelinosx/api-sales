import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { CustomerController } from '../controllers/CustomerController'
import { isAuthenticated } from '@src/infra/server/middlewares/isAuthenticated'

export const customersRouter = Router()
const customerController = new CustomerController()

customersRouter.use(isAuthenticated)

customersRouter.get('/', customerController.index)

customersRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	customerController.show
)

customersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required()
		}
	}),
	customerController.create
)

customersRouter.put(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		},
		[Segments.BODY]: {
			name: Joi.string().optional(),
			email: Joi.string().email().required()
		}
	}),
	customerController.update
)

customersRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	customerController.delete
)
