import { AppError } from '@src/server/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const authHeader = req.headers.authorization
	if (!authHeader) {
		throw new AppError('JWT Token is missing.')
	}

	const [, token] = authHeader.split(' ')
	try {
		const decodedToken = verify(token, process.env.JWT_TOKEN as string)
		const { sub } = decodedToken
		req.user = {
			id: sub as string
		}

		return next()
	} catch {
		throw new AppError('Invalid JWT Token.')
	}
}
