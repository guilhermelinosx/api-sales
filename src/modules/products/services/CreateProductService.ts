import { AppError } from '@shared/errors/AppError'
import { Product } from '@shared/typeorm/entities/Product'
import { ProductRepository } from '@shared/typeorm/repositories/ProductRepository'

interface IRequest {
  name: string
  price: number
  quantity: number
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = ProductRepository

    const productExists = await productRepository.findByName(name)
    if (productExists) {
      throw new AppError('There is already one product with this name.')
    }

    const product = productRepository.create({
      name,
      price,
      quantity,
    })

    await productRepository.save(product)
    return product
  }
}
