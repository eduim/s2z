import errorHandler from '../error-handler'
import { Request, Response, NextFunction } from 'express'
import { describe, beforeEach, test, jest, expect } from '@jest/globals'

describe('Error handler middleware', () => {
  const error = new Error('Test')

  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let mockNext: Partial<NextFunction>

  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      status: jest.fn().mockReturnThis() as any,
      json: jest.fn() as any,
    }
    mockNext = jest.fn()
  })

  test('handle error when error includes statusCode', async () => {
    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction
    )

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message })
  })
})
