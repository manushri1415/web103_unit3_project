import React, { useEffect, useMemo, useState } from 'react'
import '../css/Event.css'

const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(`${date}T00:00:00`))
}

const formatTime = (time) => {
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    }).format(new Date(`2026-01-01T${time}`))
}

const getRemainingTime = (eventDate) => {
    const difference = eventDate.getTime() - Date.now()
    const isPast = difference < 0
    const absoluteDifference = Math.abs(difference)
    const days = Math.floor(absoluteDifference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((absoluteDifference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((absoluteDifference / (1000 * 60)) % 60)

    if (isPast) {
        return {
            isPast,
            label: `Passed ${days}d ${hours}h ago`
        }
    }

    return {
        isPast,
        label: `${days}d ${hours}h ${minutes}m remaining`
    }
}

const Event = ({ event, showLocation = false }) => {
    const eventDate = useMemo(() => new Date(`${event.date}T${event.time}`), [event.date, event.time])
    const [remaining, setRemaining] = useState(() => getRemainingTime(eventDate))

    useEffect(() => {
        const interval = window.setInterval(() => {
            setRemaining(getRemainingTime(eventDate))
        }, 60000)

        setRemaining(getRemainingTime(eventDate))

        return () => window.clearInterval(interval)
    }, [eventDate])

    return (
        <article className={`event-information ${remaining.isPast ? 'event-passed' : ''}`}>
            <img src={event.image} alt='' />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    {showLocation && <p className='event-location'>{event.location_name}</p>}
                    <p><i className="fa-regular fa-calendar"></i> {formatDate(event.date)} <br /> {formatTime(event.time)}</p>
                    <p className={remaining.isPast ? 'negative-time-remaining' : 'time-remaining'}>{remaining.label}</p>
                    <p>{event.description}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
