<template>
  <div>
    <h2>Weather Information for Cities in Ukraine</h2>
    <ejs-autocomplete>

    </ejs-autocomplete>
  
    <div v-if="weatherData">
      <div v-for="(cityData, index) in weatherData" :key="index">
        <p>City: {{ cityData.name }}</p>
        <p>Temperature: {{ convertKelvinToCelsius(cityData.main.temp) }}°C</p>
        <p>Description: {{ cityData.weather[0].description }}</p>
        <hr />
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script>
import { getWeatherData } from '@/api/weatherApi';
import Vue from 'vue';
import { AutoCompletePlugin } from '@syncfusion/ej2-dropdowns';
Vue.use(AutoCompletePlugin)


export default Vue.extend (
  {
  data() {
    return {
      weatherData: null,
      error: null,
      cityName: '',
      citySuggestions: [],
    }
  },
  created() {
    this.getWeatherDataForCities()
  },
  methods: {
    async getWeatherDataForCities() {
     
        const cityNames = ['Kyiv']

        const promises = cityNames.map(async (cityName) => {
          const data = await getWeatherData(cityName)
          console.log(data)

          return data
        })

        Promise.all(promises)
          .then((allData) => {
            console.log('All data:', allData)
            this.weatherData = allData
          })
          .catch((error) => {
            console.error('Error fetching weather data:', error)
            this.error = 'Failed to fetch weather data'
          })
      
    },
    convertKelvinToCelsius(kelvin) {
      return (kelvin - 273.15).toFixed(2)
    }
  }
}
)
</script>


<style>
@import url('https://cdn.syncfusion.com/ej2/material.css')
</style>