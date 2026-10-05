import { pool } from '../config/database.js'

export const getLocations = async (_, res) => {
  try {
    const results = await pool.query('SELECT * FROM locations ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getLocationBySlug = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM locations WHERE slug = $1', [req.params.slug])

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Location not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getEventsByLocation = async (req, res) => {
  try {
    const results = await pool.query(
      `
        SELECT
          events.id,
          events.location_id,
          events.title,
          to_char(events.date, 'YYYY-MM-DD') AS date,
          to_char(events.time, 'HH24:MI') AS time,
          events.image,
          events.description,
          locations.name AS location_name,
          locations.slug AS location_slug
        FROM events
        JOIN locations ON events.location_id = locations.id
        WHERE locations.slug = $1
        ORDER BY events.date ASC, events.time ASC
      `,
      [req.params.slug]
    )

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
