import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { ProductController } from '../controllers/ProductController'

export const productsRouter = Router()
const productController = new ProductController()

productsRouter.get('/', productController.index)

productsRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	productController.show
)

productsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().required()
		}
	}),
	productController.create
)

productsRouter.put(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		},
		[Segments.BODY]: {
			name: Joi.string().optional(),
			price: Joi.number().precision(2).optional(),
			quantity: Joi.number().optional()
		}
	}),
	productController.update
)

productsRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	productController.delete
)
