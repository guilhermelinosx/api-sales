import { Request, Response } from 'express'
import { CreateSessionService } from '../services/CreateSessionService'

export class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const createUser = new CreateSessionService()
    const user = await createUser.execute({ email, password })
    return res.json(user)
  }
}
