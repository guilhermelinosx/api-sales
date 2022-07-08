import { Product } from '@shared/typeorm/entities/Product'
import { ProductsRepository } from '@shared/typeorm/repositories/ProductsRepository'

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = ProductsRepository
    const product = await productsRepository.find()
    return product
  }
}
