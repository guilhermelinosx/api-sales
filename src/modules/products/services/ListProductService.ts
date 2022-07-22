import { ProductsRepository } from '@src/infra/typeorm/repositories/ProductsRepository'
import { IProduct } from '../domain/models/IProduct'

export class ListProductService {
	public async execute(): Promise<IProduct[]> {
		const productsRepository = ProductsRepository
		const product = await productsRepository.find()
		return product
	}
}
