import express from 'express'
import { getEventById, getEvents } from '../controllers/events.js'

const router = express.Router()

router.get('/', getEvents)
router.get('/:id', getEventById)

export default router
