import 'express-async-errors'
import 'reflect-metadata'
import { Router } from 'express'
import { productRouter } from '@modules/products/routes/product.routes'
import { userRouter } from '@modules/users/routes/user.routes'
import { sessionRouter } from '@modules/users/routes/session.routes'
import { passwordRouter } from '@modules/users/routes/password.routes'
import { profileRouter } from '@modules/users/routes/profile.routes'

export const router = Router()

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/sessions', sessionRouter)
router.use('/password', passwordRouter)
router.use('/profile', profileRouter)
