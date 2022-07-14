import { IProduct } from '@modules/products/domain/models/IProduct'
import { AppError } from '@shared/errors/AppError'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

interface IShowProduct {
  id: string
}

export class ShowProductService {
  public async execute({ id }: IShowProduct): Promise<IProduct> {
    const productsRepository = ProductsRepository

    const product = await productsRepository.findById(id)
    if (!product) {
      throw new AppError('Product not found.')
    }

    return product
  }
}
