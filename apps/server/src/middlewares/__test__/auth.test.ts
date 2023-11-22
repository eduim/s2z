import { NextFunction, Request, Response } from 'express'
import { test, describe, expect, beforeEach, jest } from '@jest/globals'
import userAuthorizationMiddleware from '../user-auth'
import { generateToken } from '@lib/auth'
import { authRequest } from '@types'

describe('Auth middleware', () => {
  let mockRequest: Partial<authRequest>
  let mockResponse: Partial<Response>
  let nextFunction: NextFunction = jest.fn()

  const token = generateToken(1)

  beforeEach(() => {
    mockRequest = {
      headers: {
        cookie: `AUTHORIZATION=BEARER ${token}`,
      },
      userId: undefined,
    }
    mockResponse = {
      status: jest.fn().mockReturnThis() as any,
      json: jest.fn() as any,
    }
  })

  test('Should pass for a valid token', async () => {
    userAuthorizationMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    )

    expect(mockRequest.userId).toBe(1)
    expect(nextFunction).toHaveBeenCalled()
  })

  test('Should not pass for a invalid token', async () => {
    if (mockRequest.headers) {
      mockRequest.headers.cookie = `AUTHORIZATION=BEARER ${token}123`
    }

    userAuthorizationMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    )

    expect(mockRequest.userId).toBe(undefined)
    expect(nextFunction).toHaveBeenCalledWith(expect.any(Error))
  })
})
