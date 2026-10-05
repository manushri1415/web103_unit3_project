import dotenv from 'dotenv'
import { pool } from './database.js'

dotenv.config()

const createTables = async () => {
  await pool.query(`
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      zip TEXT NOT NULL,
      image TEXT NOT NULL,
      summary TEXT NOT NULL
    );

    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL
    );
  `)
}

const seedTables = async () => {
  await pool.query(`
    INSERT INTO locations (name, slug, address, city, state, zip, image, summary)
    VALUES
      (
        'Echo Lounge',
        'echolounge',
        '1323 Cadence Walk',
        'Dallas',
        'TX',
        '75202',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
        'A neon listening room for indie sets, poetry slams, and low-lit community nights.'
      ),
      (
        'House of Blues',
        'houseofblues',
        '2200 Rhythm Row',
        'Dallas',
        'TX',
        '75201',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
        'A big-stage hall for benefit concerts, cultural showcases, and open-floor dance parties.'
      ),
      (
        'Skyline Pavilion',
        'pavilion',
        '405 Unity Green',
        'Dallas',
        'TX',
        '75204',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
        'An outdoor plaza stage for markets, screenings, and sunset gatherings.'
      ),
      (
        'American Airlines Center',
        'americanairlines',
        '2500 Victory Ave',
        'Dallas',
        'TX',
        '75219',
        'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80',
        'The arena anchor for headline events, citywide meetups, and large community celebrations.'
      );

    INSERT INTO events (location_id, title, date, time, image, description)
    VALUES
      (
        1,
        'Synth & Spoken Word Night',
        '2026-10-09',
        '19:30',
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
        'Local poets and electronic artists trade sets in a collaborative showcase.'
      ),
      (
        1,
        'Neighborhood Open Mic',
        '2026-09-26',
        '18:00',
        'https://images.unsplash.com/photo-1526328828355-69b01701ca6a?auto=format&fit=crop&w=1200&q=80',
        'A past community mic night featuring singers, storytellers, and first-time performers.'
      ),
      (
        2,
        'Blues Benefit Bash',
        '2026-10-17',
        '20:00',
        'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80',
        'A rotating lineup raises funds for neighborhood arts scholarships.'
      ),
      (
        2,
        'Dancehall Social',
        '2026-11-04',
        '21:00',
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
        'A late-night social with lessons up front and an open dance floor after.'
      ),
      (
        3,
        'Maker Market Under the Lights',
        '2026-10-24',
        '16:00',
        'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80',
        'Artists, food vendors, and repair booths take over the pavilion lawn.'
      ),
      (
        3,
        'Outdoor Film Club',
        '2026-09-18',
        '20:15',
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
        'A past screening night with blankets, folding chairs, and a post-film conversation.'
      ),
      (
        4,
        'UnityGrid Fall Festival',
        '2026-11-14',
        '13:00',
        'https://images.unsplash.com/photo-1496024840928-4c417adf211d?auto=format&fit=crop&w=1200&q=80',
        'A full-arena community festival with music, local teams, and public art installations.'
      ),
      (
        4,
        'City Volunteer Summit',
        '2026-10-31',
        '10:00',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
        'Service groups gather for workshops, signups, and cross-neighborhood planning.'
      );
  `)
}

const resetDatabase = async () => {
  try {
    await createTables()
    await seedTables()
    console.log('Database reset complete.')
  } catch (error) {
    console.error('Database reset failed:', error)
  } finally {
    await pool.end()
  }
}

resetDatabase()
