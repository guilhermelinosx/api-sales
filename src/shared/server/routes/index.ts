import { Router } from 'express'
import { productRouter } from '@modules/products/routes/product.routes'

export const router = Router()

router.use('/products', productRouter)
