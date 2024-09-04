import jwt from 'jsonwebtoken'
import { type NextFunction, type Request, type Response } from 'express'

import ENV from '../utils/environment'
import { logWarn } from '../utils/logger'

import { type ITokenPayload } from '../types/token.type'

interface DecodedToken {
  id: string
  role: 'student' | 'teacher'
  iat: number
  exp: number
}

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    logWarn(req, 'Token is not provided')
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token, ENV.accessTokenSecret as string, (error, decoded) => {
    if (error) {
      logWarn(req, 'Token is invalid/Forbidden')
      return res.status(403).json({ message: 'Forbidden' })
    }

    const { id, role } = decoded as DecodedToken

    req.userId = id
    req.role = role
    next()
  })
}

export const verifyUserRole = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
    req.role = undefined
    next()
  } else {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, ENV.accessTokenSecret as string, (error, decoded) => {
      if (error) {
        logWarn(req, 'Token is invalid/Forbidden')
        return res.status(403).json({ message: 'Forbidden' })
      }

      const { id, role } = decoded as DecodedToken

      req.userId = id
      req.role = role
      next()
    })
  }
}

export const verifyTeacher = (req: Request, res: Response, next: NextFunction) => {
  if (req.role === 'teacher') {
    logWarn(req, 'Unauthorized access')
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}

export const verifyStudent = (req: Request, res: Response, next: NextFunction) => {
  if (req.role === 'student') {
    logWarn(req, 'Unauthorized access')
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}

export const accessTokenSign = (payload: ITokenPayload) => {
  return jwt.sign(payload, ENV.accessTokenSecret as string)
}

export const refreshTokenSign = (payload: ITokenPayload) => {
  return jwt.sign(payload, ENV.refreshTokenSecret as string, { expiresIn: '7d' })
}

export default verifyJwt
