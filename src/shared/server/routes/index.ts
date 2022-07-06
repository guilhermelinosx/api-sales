import { Router } from 'express'
import { productRouter } from '@modules/products/routes/product.routes'
import { userRouter } from '@modules/users/routes/user.routes'

export const router = Router()

router.use('/products', productRouter)
router.use('/users', userRouter)
