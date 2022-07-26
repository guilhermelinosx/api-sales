import { ProductsRepository } from '@src/server/typeorm/repositories/ProductsRepository'
import { IProduct } from '../domain/models/IProduct'

export class ListProductService {
	public async execute(): Promise<IProduct[]> {
		const productsRepository = ProductsRepository
		const product = await productsRepository.find()
		return product
	}
}
