/* eslint-disable camelcase */
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from 'typeorm'
import { OrderProducts } from './OrderProducts'

@Entity('products')
export class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@OneToMany(() => OrderProducts, order_products => order_products.product)
	order_products: OrderProducts[]

	@Column()
	name: string

	@Column('decimal')
	price: number

	@Column('int')
	quantity: number

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
