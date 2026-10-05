import express from 'express'
import { getEventsByLocation, getLocationBySlug, getLocations } from '../controllers/locations.js'

const router = express.Router()

router.get('/', getLocations)
router.get('/:slug', getLocationBySlug)
router.get('/:slug/events', getEventsByLocation)

export default router
