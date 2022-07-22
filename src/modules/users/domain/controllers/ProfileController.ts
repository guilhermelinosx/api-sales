import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { ShowProfileService } from '../../services/ShowProfileService'
import { UpdateProfileService } from '../../services/UpdateProfileService'

export class ProfileController {
	public async show(req: Request, res: Response): Promise<Response> {
		const id = req.user.id
		const showProfile = new ShowProfileService()
		const user = await showProfile.execute({ id })
		return res.json(instanceToInstance(user))
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const id = req.user.id
		const { name, email, newPassword, oldPassword } = req.body
		const updateProfile = new UpdateProfileService()
		const user = await updateProfile.execute({
			id,
			name,
			email,
			newPassword,
			oldPassword
		})
		return res.json(instanceToInstance(user))
	}
}
