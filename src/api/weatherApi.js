import axios from 'axios'

const apiKey = 'fd287c543edbeee77bb83f0aedbe94b5'

export async function getWeatherData(cityName) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    )
    console.log(cityName)
    return response.data
  } catch (error) {
    console.error(`Error fetching weather data for ${cityName}:`, error)
    throw error
  }
}

export async function getHourlyTemperatureData(cityName) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    )
    const hourlyData = response.data.list.map((item) => ({
      time: item.dt_txt,
      temperature: item.main.temp
    }))

    const labels = hourlyData.map((item) => item.time)
    const data = hourlyData.map((item) => item.temperature)

    return { labels, data }
  } catch (error) {
    console.error(`Error fetching hourly temperature data for ${cityName}:`, error)
    throw error
  }
}

export async function getFiveDayForecast(cityName) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&cnt=40`
    )

    const dailyData = response.data.list.reduce((accumulator, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString()
      if (!accumulator[date]) {
        accumulator[date] = {
          date: new Date(item.dt * 1000),
          temperatures: [],
          descriptions: new Set(),
          icons: new Set()
        }
      }

      accumulator[date].temperatures.push(item.main.temp)
      accumulator[date].descriptions.add(item.weather[0].description)
      accumulator[date].icons.add(item.weather[0].icon)

      return accumulator
    }, {})

    console.log(dailyData)

    const fiveDayForecast = Object.values(dailyData).map((day) => {
      console.log([...new Set(day.descriptions)])
      const firstDescription = [...day.descriptions][0]
      const firstIcon = [...day.icons][0]
      return {
        date: day.date,
        averageTemperature: calculateAverage(day.temperatures),
        descriptions: firstDescription,
        icon: firstIcon
      }
    })

    return fiveDayForecast
  } catch (error) {
    console.error('Error fetching five-day forecast data:', error)
    throw error
  }
}

function calculateAverage(temperatures) {
  const sum = temperatures.reduce((total, temp) => total + temp, 0)
  return sum / temperatures.length
}
