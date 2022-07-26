import { Product } from '@src/server/typeorm/entities/Product'
import { IProduct } from '@src/modules/products/domain/models/IProduct'

export interface ICreateOrder {
	customer_id: string
	products: Product[]
}
