import { IUser } from '../models/IUser'

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>
  findByName(name: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
}
