import express from 'express'

import userAuthorizationMiddleware from './middlewares/user-auth'
import UsersController from './controllers/usersController'
import SimulationController from './controllers/simulationController'

const router = express.Router()
const authRouter = express.Router()

router.post('/users', UsersController.createUser)
router.get('/login', UsersController.login)

authRouter.use(userAuthorizationMiddleware)

authRouter.get('/me', UsersController.me)
authRouter.get('/users/:id', UsersController.getUserById)

authRouter.post('/posts', SimulationController.createSimulation)
authRouter.get('/posts', SimulationController.getSimulatioin)

export { router, authRouter }
