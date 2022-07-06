import { datasource } from '..'
import { Product } from '../entities/Product'

export const UserRepository = datasource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = await this.findOneBy({ name })
    return product
  },
})
