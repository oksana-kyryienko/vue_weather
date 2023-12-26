import axios from 'axios'
export async function getUserLocation() {
  try {

    const ipResponse = await axios.get('https://ipinfo.io/?token=9ed6133e832f18')
   
    const city = ipResponse.data.city


    console.log('User city:', city)


    return city


  } catch (error) {
    console.error('Error fetching user location:', error)
    throw error
  }
}
