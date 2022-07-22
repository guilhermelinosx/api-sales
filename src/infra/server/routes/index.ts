import { customersRouter } from '@src/modules/customers/domain/routes/customers.routes'
import { ordersRouter } from '@src/modules/orders/domain/routes/orders.routes'
import { productsRouter } from '@src/modules/products/domain/routes/products.routes'
import { passwordsRouter } from '@src/modules/users/domain/routes/passwords.routes'
import { profilesRouter } from '@src/modules/users/domain/routes/profiles.routes'
import { sessionsRouter } from '@src/modules/users/domain/routes/sessions.routes'
import { usersRouter } from '@src/modules/users/domain/routes/users.routes'
import { Router } from 'express'

export const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordsRouter)
routes.use('/profile', profilesRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)
