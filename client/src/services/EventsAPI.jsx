const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error)
  }

  return response.json()
}

const EventsAPI = {
  getAllEvents: async () => {
    const response = await fetch('/api/events')
    return handleResponse(response)
  },

  getEventById: async (id) => {
    const response = await fetch(`/api/events/${id}`)
    return handleResponse(response)
  }
}

export default EventsAPI
