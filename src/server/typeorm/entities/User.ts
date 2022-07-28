import { Exclude } from 'class-transformer'
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	@Exclude()
	password: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
