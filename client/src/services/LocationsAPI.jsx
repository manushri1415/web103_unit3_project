const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error)
  }

  return response.json()
}

const LocationsAPI = {
  getAllLocations: async () => {
    const response = await fetch('/api/locations')
    return handleResponse(response)
  },

  getLocationBySlug: async (slug) => {
    const response = await fetch(`/api/locations/${slug}`)
    return handleResponse(response)
  },

  getEventsByLocation: async (slug) => {
    const response = await fetch(`/api/locations/${slug}/events`)
    return handleResponse(response)
  }
}

export default LocationsAPI
