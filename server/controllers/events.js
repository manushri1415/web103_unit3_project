import { pool } from '../config/database.js'

export const getEvents = async (_, res) => {
  try {
    const results = await pool.query(`
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
      ORDER BY events.date ASC, events.time ASC
    `)

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getEventById = async (req, res) => {
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
        WHERE events.id = $1
      `,
      [req.params.id]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
