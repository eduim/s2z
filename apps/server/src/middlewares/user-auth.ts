import { checkToken } from '../lib/auth'
import { DecodedToken } from '../types'
import { NextFunction, Request, Response } from 'express'
const userAuthorizationMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const authCookies = req.headers.cookie
    if (!authCookies) {
      throw new Error('Authorization header/cookie is required')
    }

    const token = authCookies.split(' ')[1]

    if (!token) {
      throw new Error('Missing token in headers')
    }
    const { userId } = checkToken(token) as DecodedToken

    req.userId = userId as number

    next()
  } catch (e) {
    next(e)
  }
}

export default userAuthorizationMiddleware
