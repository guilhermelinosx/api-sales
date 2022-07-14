import { AppError } from '@shared/errors/AppError'
import { IOrder } from '../domain/models/IOrder'
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository'

interface IShowOrder {
  id: string
}

export class ShowOrderService {
  public async execute({ id }: IShowOrder): Promise<IOrder | null> {
    const ordersRepository = OrdersRepository
    const order = ordersRepository.findById(id)

    if (!order) {
      throw new AppError('Order not found.')
    }
    return order
  }
}
