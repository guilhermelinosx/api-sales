import { IProduct } from '../domain/models/IProduct'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

export class ListProductService {
  public async execute(): Promise<IProduct[]> {
    const productsRepository = ProductsRepository
    const product = await productsRepository.find()
    return product
  }
}
