import axios from 'axios'

const mapboxApiKey = 'pk.eyJ1Ijoib2tzYW5hbHMiLCJhIjoiY2xxZjZ1cXE1MHRjOTJvbWsxNzlwZWN0MiJ9.HTar4r4MxJLt16C9Wxe0Mw'

export async function getCitySuggestions(input) {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${mapboxApiKey}`
    )

    if (response.data.features && response.data.features.length > 0) {
      return response.data.features.map((feature) => feature.place_name)
    } else {
      return []
    }
  } catch (error) {
    console.error('Error fetching city suggestions from Mapbox API:', error)
    throw error
  }
}
