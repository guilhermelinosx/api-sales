import 'express-async-errors'
import 'reflect-metadata'
import { Router } from 'express'
import { productsRouter } from '@modules/products/routes/products.routes'
import { usersRouter } from '@modules/users/routes/users.routes'
import { sessionsRouter } from '@modules/users/routes/sessions.routes'
import { passwordsRouter } from '@modules/users/routes/passwords.routes'
import { profilesRouter } from '@modules/users/routes/profiles.routes'
import { customersRouter } from '@modules/customers/routes/customers.routes'
export const router = Router()

router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.use('/sessions', sessionsRouter)
router.use('/password', passwordsRouter)
router.use('/profile', profilesRouter)
router.use('/customers', customersRouter)
