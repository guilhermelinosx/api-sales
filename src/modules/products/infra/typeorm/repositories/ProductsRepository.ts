import { datasource } from '@shared/infra/typeorm'
import { In } from 'typeorm'
import { Product } from '../entities/Product'

interface IFindProducts {
  id: string
}

export const ProductsRepository = datasource.getRepository(Product).extend({
  async findById(id: string): Promise<Product | null> {
    const products = await this.findOneBy({ id })
    return products
  },

  async findByName(name: string): Promise<Product | null> {
    const products = await this.findOneBy({ name })
    return products
  },

  async findByAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(products => products.id)

    const productsExists = await this.find({
      where: {
        id: In(productsIds),
      },
    })
    return productsExists
  },
})
