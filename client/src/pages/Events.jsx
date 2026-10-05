import React, { useEffect, useMemo, useState } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Events.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [sortOrder, setSortOrder] = useState('soonest')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const [eventsData, locationsData] = await Promise.all([
          EventsAPI.getAllEvents(),
          LocationsAPI.getAllLocations()
        ])

        setEvents(eventsData)
        setLocations(locationsData)
      } catch (requestError) {
        setError(requestError.message)
      }
    }

    loadEvents()
  }, [])

  const visibleEvents = useMemo(() => {
    const filteredEvents = selectedLocation === 'all'
      ? events
      : events.filter((event) => event.location_slug === selectedLocation)

    return [...filteredEvents].sort((firstEvent, secondEvent) => {
      const firstDate = new Date(`${firstEvent.date}T${firstEvent.time}`)
      const secondDate = new Date(`${secondEvent.date}T${secondEvent.time}`)

      return sortOrder === 'soonest' ? firstDate - secondDate : secondDate - firstDate
    })
  }, [events, selectedLocation, sortOrder])

  return (
    <section className='events-page'>
      <div className='events-toolbar'>
        <div>
          <p className='eyebrow'>Full calendar</p>
          <h2>All Plaza Events</h2>
        </div>

        <div className='event-controls'>
          <label>
            Location
            <select value={selectedLocation} onChange={(event) => setSelectedLocation(event.target.value)}>
              <option value='all'>All locations</option>
              {locations.map((location) => (
                <option key={location.id} value={location.slug}>
                  {location.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sort
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value='soonest'>Soonest first</option>
              <option value='latest'>Latest first</option>
            </select>
          </label>
        </div>
      </div>

      {error && <p className='status-message'>{error}</p>}

      <div className='event-grid'>
        {visibleEvents.length > 0
          ? visibleEvents.map((event) => <Event key={event.id} event={event} showLocation />)
          : <p className='status-message'>No events match that location yet.</p>}
      </div>
    </section>
  )
}

export default Events
