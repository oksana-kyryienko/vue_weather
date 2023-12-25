import axios from 'axios'

const apiKey = '9141af48f5b716c421d93419c4d2cb0d'

export async function getCityByIp() {
  try {
    const response = await axios.get(`http://api.ipapi.com/api/check?access_key=${apiKey}`)
    return response.data.city
  } catch (error) {
    console.error('Error fetching city by IP:', error)
    throw error
  }
}
