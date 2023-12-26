<!-- WeatherCard.vue -->

<template>
  <div class="weather-card">
    <button @click="removeWeatherCard" class="remove-card-btn" :disabled="isFavoritePage">
      {{ $t('buttons.remove') }}
    </button>
    <div class="card-content">
      <div v-if="error">
        <message-error-modal
          :visible="error !== null"
          :custom-styles="{ width: '300px' }"
          :error-message="error"
          @close-modal="clearError"
        />
      </div>

      <div class="search-container">
        <input
          v-model="cityName"
          @input="debouncedGetCitySuggestions"
          :placeholder="$t('placeholderCity')"
          class="search-input"
          :readonly="isFavoritePage"
        />
      </div>

      <ul v-if="citySuggestions.length" class="suggestions-list">
        <li
          v-for="(suggestion, index) in citySuggestions"
          :key="index"
          @click="selectCity(suggestion)"
          class="suggestion-item"
        >
          {{ suggestion }}
        </li>
      </ul>

      <div class="favorites-btn">
        <button @click="addToFavorites" class="add-to-favorites-btn" :disabled="isFavoritePage">
          {{ $t('buttons.addFavorites') }}
        </button>
        <button @click="removeFromFavorites" :disabled="isCard" class="remove-from-favorites-btn">
          {{ $t('buttons.removeFavorites') }}
        </button>
      </div>

      <button @click="toggleView" class="toggle-view-btn">
        {{ isWeeklyView ? $t('buttons.showToday') : $t('buttons.showWeekly') }}
      </button>

      <div v-if="!isWeeklyView">
        <p class="current-date">{{ getCurrentDate() }}</p>

        <p class="city-name">{{ $t('city') }}: {{ cityData ? $t(cityData.name) : 'N/A' }}</p>
        <img
          v-if="cityData && cityData.weather && cityData.weather[0].icon"
          :src="getWeatherIconUrl(cityData.weather[0].icon)"
          alt="Weather Icon"
          class="weather-icon"
        />
        <p class="temperature">
          {{ $t('temp') }}: {{ cityData ? convertKelvinToCelsius(cityData.main.temp) : 'N/A' }}°C
        </p>

        <p>
          {{ $t('description') }}:
          {{
            cityData && cityData.weather
              ? $t(`descriptionWeather.${cityData.weather[0].description}`)
              : $t('notAvailable')
          }}
        </p>
      </div>

      <div v-else>
        <h3>{{ $t('weeklyForecast') }}</h3>
        <ul class="weekly-list" v-if="weeklyWeather.length > 0">
          <li class="weekly-item" v-for="(day, index) in weeklyWeather" :key="index">
            <p>{{ formatDate(day.date) }}</p>

            <p>{{ $t('temp') }}: {{ convertKelvinToCelsius(day.temperature) }}°C</p>
            <img :src="getWeatherIconUrl(day.icon)" alt="Weather Icon" v-if="day.icon" />

            <p>{{ day.description }}</p>
            <p v-if="day.dayOfWeek">Day: {{ day.dayOfWeek }}</p>
          </li>
        </ul>
      </div>

      <hourly-temperature-chart :index="index" :data="hourlyTemperatureData" />
    </div>
  </div>

  <remove-confirmation-modal
    :visible="showRemoveConfirmation"
    @confirm-remove="confirmRemove"
    @cancel-remove="cancelRemove"
  />
  <add-to-favorites-modal :visible="showAddToFavoritesModal" @close-modal="closeModal" />
</template>

<script>
import { getWeatherData, getHourlyTemperatureData, getFiveDayForecast } from '@/api/weatherApi'
import _debounce from 'lodash/debounce'
import { getCitySuggestions } from '@/api/cityApi'
import AddToFavoritesModal from '@/components/Modals/AddToFavoritesModal.vue'
import RemoveConfirmationModal from '@/components/Modals/RemoveConfirmationModal.vue'
import MessageErrorModal from '@/components/Modals/MessageErrorModal.vue'
import HourlyTemperatureChart from '@/components/HourlyTemperatureChart.vue'
import { getCurrentDate } from '@/utils/currentDate'
import { convertKelvinToCelsius } from '@/utils/convertTemperature'
import { formatDate } from '@/utils/formatDate'
import { getUserLocation } from '@/api/userLocationApi'

const DEBOUNCE_DELAY = 300

export default {
  components: {
    AddToFavoritesModal,
    RemoveConfirmationModal,
    MessageErrorModal,
    HourlyTemperatureChart
  },
  props: {
    initialCity: String,
    index: Number,
    isFavoritePage: Boolean,
    isCard: Boolean,
    isDayMode: Boolean
  },
  emits: ['remove', 'remove-from-favorites', 'add-to-favorites'],

  data() {
    return {
      cityData: null,
      error: null,
      cityName: this.initialCity,
      citySuggestions: [],
      temperatureChart: null,
      showRemoveConfirmation: false,
      showAddToFavoritesModal: false,
      isWeeklyView: false,
      weeklyWeather: [],
      hourlyTemperatureData: []
    }
  },
  watch: {
    '$i18n.locale': 'getFiveDayForecast'
  },
  async created() {
    try {
      this.cityName = (await getUserLocation()) || this.initialCity
      this.getWeatherDataForCity()
    } catch (error) {
      console.error('Error fetching user location:', error)
    }
  },
  methods: {
    async getWeatherDataForCity() {
      try {
        const data = await getWeatherData(this.cityName)
        this.cityData = data
        this.getHourlyTemperatureData()
        await this.getFiveDayForecast()

        this.error = null
      } catch (error) {
        console.error('Error fetching weather data:', error)
        this.error = `Failed to fetch weather data for ${this.cityName}`
        this.cityName = ''
      }
    },
    async getHourlyTemperatureData() {
      try {
        const data = await getHourlyTemperatureData(this.cityName)
        this.hourlyTemperatureData = data
      } catch (error) {
        console.error('Error fetching hourly temperature data:', error)
        this.error = 'Failed to fetch hourly temperature data'
      }
    },
    async getFiveDayForecast() {
      try {
        const response = await getFiveDayForecast(this.cityName, this.$t)
        const weeklyData = response.slice(0, 5)

        this.weeklyWeather = weeklyData.map((item) => ({
          date: item.date,
          temperature: item.averageTemperature,
          description: item.descriptions,
          icon: item.icon
        }))
      } catch (error) {
        console.error('Error fetching five-day forecast data:', error)
        this.error = 'Failed to fetch five-day forecast data'
      }
    },
    async reloadWeatherDataWithNewLanguage() {
      await this.getFiveDayForecast()
    },

    toggleView() {
      this.isWeeklyView = !this.isWeeklyView

      if (this.isWeeklyView) {
        this.getFiveDayForecast()
      }
    },
    formatDate(date) {
      return formatDate(date, this.$i18n.locale)
    },
    convertKelvinToCelsius(kelvin) {
      return convertKelvinToCelsius(kelvin)
    },
    async getCitySuggestions() {
      const input = this.cityName.trim().toLowerCase()
      if (input.length === 0) {
        this.citySuggestions = []
        return
      }
      try {
        const suggestions = await getCitySuggestions(input)
        this.citySuggestions = suggestions
      } catch (error) {
        console.error('Error fetching city suggestions:', error)
        this.citySuggestions = []
      }
    },
    debouncedGetCitySuggestions: _debounce(function () {
      this.getCitySuggestions()
    }, DEBOUNCE_DELAY),
    selectCity(city) {
      if (!this.isFavoritePage) {
        this.cityName = city
        this.citySuggestions = []
        this.getWeatherDataForCity()
      }
    },

    removeWeatherCard(index) {
      this.showRemoveConfirmation = true
      this.cardToRemove = index
    },

    confirmRemove() {
      this.$emit('remove', this._uid)
      this.showRemoveConfirmation = false
      this.cardToRemove = null
    },

    cancelRemove() {
      this.showRemoveConfirmation = false
      this.cardToRemove = null
    },
    getCurrentDate() {
      return getCurrentDate.call(this)
    },

    getWeatherIconUrl(iconCode) {
      return `https://openweathermap.org/img/w/${iconCode}.png`
    },
    addToFavorites() {
      this.$emit('add-to-favorites', this.cityData)
      this.showAddToFavoritesModal = true
    },
    removeFromFavorites() {
      this.$emit('remove-from-favorites', this.cityData)
    },
    closeModal() {
      this.showAddToFavoritesModal = false
    },
    clearError() {
      this.error = null
    }
  }
}
</script>

<style scoped>
.suggestion-item {
  cursor: pointer;
  padding: 5px;
  transition: background-color 0.3s;
}

.suggestion-item:hover {
  background-color: #f0f0f0;
}

.weather-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-content {
  text-align: left;
}

.city-name {
  font-size: 18px;
  font-weight: bold;
}

.temperature,
.description {
  margin-top: 5px;
  font-size: 14px;
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-input {
  width: 100%;
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
}

.add-to-favorites-btn,
.remove-from-favorites-btn,
.toggle-view-btn {
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
}
.add-to-favorites-btn:hover,
.remove-from-favorites-btn:hover {
  background-color: #92ec95;
}

.add-to-favorites-btn:disabled,
.remove-from-favorites-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hourly-temperature {
  margin-top: 10px;
}

.hourly-temperature-list {
  list-style-type: none;
  padding: 0;
}

.hourly-temperature-item {
  margin-bottom: 5px;
}

.remove-card-btn {
  background-color: lightcoral;
  padding: 10px;
  border: 1px solid coral;
  margin-bottom: 10px;
  color: white;
}

.remove-card-btn:hover {
  background-color: coral;
}

.remove-card-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.current-date {
  font-weight: bold;
}

.weekly-list {
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
}

.weekly-item {
  padding: 10px;
}

.favorites-btn {
  display: flex;
  gap: 10px;
}

@media (max-width: 768px) {
  .favorites-btn {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 250px;
  }
}
</style>
