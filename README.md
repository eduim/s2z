# S2Z

This is an official starter Turborepo.

## Using the repo

Tech needed

- Node
- Docker desktop

First you'll find in `client` and `server` a `.env.example` and `.env.test.example`
in the case of the `server`. Copy the internal info in `.env` and `.env.test`

Run the following commands:

```sh
# Setup db
npm run db:dev:setup

# Run services
npm run dev

```

Run the tests:

```sh
npm run test
```

## What tech stack is used

- Turborepo to create a monorepo and run all the services (client/server)
- Tailwind CSS
- Docker to run databases (test and dev)
- TypeScript
- PrismaORM to manage databases

## Learnings

I understimated the amount of time that the simulation would take and I tried
to complete almost every extra point but without finishig completely all or almost all.

I know that it doesn't make sanse from the point of view of development and task management
but I did it intecionally to show that I know how to testing, auth, db persistance, etc.

## Improvements if I would have time

- Finish conection Server - Client
- Auth Client (finish in Server)
- Cache on server and client
- API integrations
- Adding more inputs to the simulator

### Apps

- `client`: a React app based on Vite
- `server`: a Node.js app based on express

### API documentation

#### POST /simulation

Request body example

```
  {
    "data": [
        {
            "id": "1",
            "date": "2023-09-15T00:00:00.000Z",
            "trees": 10
        },
        {
            "id": "2",
            "date": "2023-09-20T00:00:00.000Z",
            "trees": 15
        }
    ],
    "mode": "M",
    "country": "US"
  }
```

Response body example

```
  {
      "id": "1",
      "country": "US",
      "mode": "M",
      "offSet": [
          {
              "date": "2023-10-23",
              "total": 0
          },
          {
              "date": "2023-11-23",
              "total": 0
          }
      ],
      "costs": {
          "costsSeries": [
              {
                  "date": "2023-10-23",
                  "total": 6600
              },
              {
                  "date": "2023-11-23",
                  "total": 6600
              }
          ],
          "totalCost": 10615
      },
      "createdAt": "2023-10-23T08:41:48.620Z"
  }
```

#### POST /simulation/calculate

Request body example

```
  {
    "data": [
        {
            "id": "1",
            "date": "2023-09-15T00:00:00.000Z",
            "trees": 10
        },
        {
            "id": "2",
            "date": "2023-09-20T00:00:00.000Z",
            "trees": 15
        }
    ],
    "mode": "M",
    "country": "US"
  }
```

Response body example

```
  { "simulation: {
      "country": "US",
      "mode": "M",
      "offSet": [
          {
              "date": "2023-10-23",
              "total": 0
          },
          {
              "date": "2023-11-23",
              "total": 0
          }
      ],
      "costs": {
          "costsSeries": [
              {
                  "date": "2023-10-23",
                  "total": 6600
              },
              {
                  "date": "2023-11-23",
                  "total": 6600
              }
          ],
          "totalCost": 10615
      }
    }
  }
```

#### PUT /simulation/:id

Request body example

```
  {
    "data": [
        {
            "id": "1",
            "date": "2023-09-15T00:00:00.000Z",
            "trees": 10
        },
        {
            "id": "2",
            "date": "2023-09-20T00:00:00.000Z",
            "trees": 15
        }
    ],
    "mode": "M",
    "country": "US"
  }
```

Response body example

```
  {
      "id": "1",
      "country": "US",
      "mode": "M",
      "offSet": [
          {
              "date": "2023-10-23",
              "total": 0
          },
          {
              "date": "2023-11-23",
              "total": 0
          }
      ],
      "costs": {
          "costsSeries": [
              {
                  "date": "2023-10-23",
                  "total": 6600
              },
              {
                  "date": "2023-11-23",
                  "total": 6600
              }
          ],
          "totalCost": 10615
      },
      "createdAt": "2023-10-23T08:41:48.620Z"
  }
```

#### GET /simulation/:id

Response body example

```
  {
      "id": "1",
      "country": "US",
      "mode": "M",
      "offSet": [
          {
              "date": "2023-10-23",
              "total": 0
          },
          {
              "date": "2023-11-23",
              "total": 0
          }
      ],
      "costs": {
          "costsSeries": [
              {
                  "date": "2023-10-23",
                  "total": 6600
              },
              {
                  "date": "2023-11-23",
                  "total": 6600
              }
          ],
          "totalCost": 10615
      },
      "createdAt": "2023-10-23T08:41:48.620Z"
  }
```
