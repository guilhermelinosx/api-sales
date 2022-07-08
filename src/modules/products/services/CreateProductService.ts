import { AppError } from '@shared/errors/AppError'
import { Product } from '@shared/typeorm/entities/Product'
import { ProductsRepository } from '@shared/typeorm/repositories/ProductsRepository'

interface IRequest {
  name: string
  price: number
  quantity: number
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = ProductsRepository

    const productExists = await productsRepository.findByName(name)
    if (productExists) {
      throw new AppError('There is already one product with this name.')
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    })

    await productsRepository.save(product)
    return product
  }
}
