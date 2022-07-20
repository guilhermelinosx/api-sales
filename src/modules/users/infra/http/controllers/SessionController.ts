import { CreateSessionService } from '@modules/users/services/CreateSessionService'
import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'

export class SessionController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body
		const createUser = new CreateSessionService()
		const user = await createUser.execute({ email, password })
		return res.json(instanceToInstance(user))
	}
}
