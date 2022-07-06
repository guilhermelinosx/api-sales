import { Router } from 'express'
import { productRouter } from '@modules/products/routes/product.routes'
import { userRouter } from '@modules/users/routes/user.routes'
import { sessionRouter } from '@modules/users/routes/session.routes'

export const router = Router()

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/sessions', sessionRouter)
