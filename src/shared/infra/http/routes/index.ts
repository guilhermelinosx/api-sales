import { Router } from 'express'
import { productsRouter } from '@modules/products/infra/http/routes/products.routes'
import { usersRouter } from '@modules/users/infra/http/routes/users.routes'
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes'
import { passwordsRouter } from '@modules/users/infra/http/routes/passwords.routes'
import { profilesRouter } from '@modules/users/infra/http/routes/profiles.routes'
import { customersRouter } from '@modules/customers/infra/http/routes/customers.routes'
import { ordersRouter } from '@modules/orders/infra/http/routes/orders.routes'

export const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordsRouter)
routes.use('/profile', profilesRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)
