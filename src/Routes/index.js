import express from 'express'
import IndexController from '../Controller/index.js'
import RoomRoutes from './room.js'

const router = express.Router()

router.get('/',IndexController.home)
router.use('/rooms',RoomRoutes)

export default router