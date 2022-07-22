import { AppError } from '@src/infra/errors/AppError'
import { OrdersRepository } from '@src/infra/typeorm/repositories/OrdersRepository'
import { IShowOrder } from '../domain/interfaces/IShowOrder'
import { IOrder } from '../domain/models/IOrder'

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
