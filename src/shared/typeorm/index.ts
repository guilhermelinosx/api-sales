import 'dotenv/config'
import { DataSource } from 'typeorm'
import { Product } from './entities/Product'
import { CreateProduct1657066844889 } from './migrations/1657066844889-CreateProduct'

export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.ORM_HOST,
  port: Number(process.env.ORM_PORT),
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DATABASE,
  synchronize: true,
  migrations: [CreateProduct1657066844889],
  entities: [Product],
})
