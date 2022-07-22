export interface IUpdateProfile {
	id: string
	name: string
	email: string
	newPassword?: string
	oldPassword?: string
}
