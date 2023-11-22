import request from 'supertest'
import startServer from '../app'
import { Server } from 'http'
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import { offSet, costs } from '@lib/data_test'

describe('/simulation', () => {
  let app: Server
  beforeAll(() => {
    app = startServer()
  })

  afterAll(() => {
    app.close()
  })

  test('POST should save simulation in DB', async () => {
    const body = {
      data: [
        {
          id: '1',
          date: '2023-10-23',
          trees: 55,
        },
      ],
      mode: 'M',
      country: 'UK',
    }

    const response = await request(app).post('/simulation').send(body)

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      simulation: {
        id: expect.any(Number),
        country: 'UK',
        mode: 'M',
        offSet,
        costs,
      },
    })
  })
})
