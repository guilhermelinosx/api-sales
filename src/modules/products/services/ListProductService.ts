import { Product } from '@shared/typeorm/entities/Product'
import { ProductRepository } from '@shared/typeorm/repositories/ProductRepository'

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = ProductRepository

    const product = await productRepository.find()
    return product
  }
}
