import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'

const LocationEvents = () => {
    const { slug } = useParams()
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const loadLocationEvents = async () => {
            try {
                const [locationData, eventData] = await Promise.all([
                    LocationsAPI.getLocationBySlug(slug),
                    LocationsAPI.getEventsByLocation(slug)
                ])

                setLocation(locationData)
                setEvents(eventData)
            }
            catch (error) {
                setError(error.message)
            }
        }

        loadLocationEvents()
    }, [slug])

    return (
        <div className='location-events'>
            {location && <header className='location-hero'>
                <div className='location-image'>
                    <img src={location.image} alt='' />
                </div>

                <div className='location-info'>
                    <Link to='/' className='back-link'>Back to map</Link>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                    <p>{location.summary}</p>
                </div>
            </header>}

            {error && <p className='status-message'>{error}</p>}

            <main className='location-event-grid'>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            event={event}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents
