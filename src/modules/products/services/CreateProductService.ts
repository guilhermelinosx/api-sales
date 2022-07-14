import { IProduct } from '@modules/products/domain/models/IProduct'
import { AppError } from '@shared/errors/AppError'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

interface ICreateProduct {
  name: string
  price: number
  quantity: number
}

export class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
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
