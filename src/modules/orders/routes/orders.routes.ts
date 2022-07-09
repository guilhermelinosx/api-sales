import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { OrderController } from '../controllers/OrderController'
import { isAuthenticated } from '@shared/middlewares/isAuthenticated'

export const ordersRouter = Router()
const orderController = new OrderController()
ordersRouter.use(isAuthenticated)

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderController.show
)

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  orderController.create
)
