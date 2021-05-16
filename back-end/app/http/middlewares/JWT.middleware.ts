import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export const verifyJWTToken = (req: Request, res: Response, next: NextFunction) => {
	const accessTokenHeader = req.headers.authentication || req.body.userToken || req.headers.Bearer

	if (!accessTokenHeader) return res.status(401).json({ status: 401, message: 'No authorization token provided' })

	verify(accessTokenHeader, process.env.JWT_SECURE_KEY!, (error: any) => {
		if (error) {
			return res.status(403).json({ status: 403, message: 'Tokens are not the same' })
		}

		next()
	})
}
