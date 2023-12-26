<!-- MainCard.vue -->
<template>
    <div v-if="loading">
    <Loader />
  </div>
  <div :class="['container', { 'night-mode': !isDayMode }]">
    <button @click="toggleDayNightMode" class="toggle-day-night-btn">
      {{ isDayMode ? $t('buttons.switchNight') : $t('buttons.switchDay') }}
    </button>
    <h2 class="title">{{ $t('weatherInfo') }}</h2>
    <div v-if="weatherData">
      <weather-card
        v-for="cityData in weatherData"
        :key="cityData._uid"
        :initialCity="cityData.name"
        @remove="removeWeatherCard"
        @add-to-favorites="addToFavorites"
        :isDayMode="isDayMode"
        :isCard="true"
      />
      <button @click="addWeatherCard" class="add-card-btn">{{ $t ('buttons.addCard') }}</button>
    </div>
    <div v-else>
      <p>{{ $t('loading') }}...</p>
    </div>
    <div v-if="error">
      <p>{{ $t('error') }}: {{ error }}</p>
    </div>

    <message-error-modal
      :visible="showMaxCardsModal"
      :customStyles="{ height: '150px' }"
      :errorMessage="$t('errorMesMax')"
      @close-modal="closeMaxCardsModal"
    />
  </div>
</template>

<script>
import { getHourlyTemperatureData, getWeatherData } from '@/api/weatherApi'
import WeatherCard from '@/components/WeatherCard.vue'
import MessageErrorModal from '@/components/Modals/MessageErrorModal.vue'
import Loader from '@/components/LoaderUi.vue'

export default {
  components: {
    WeatherCard,
    MessageErrorModal,
    Loader
  },
  emits: ['remove', 'remove-from-favorites', 'add-to-favorites'],

  data() {
    return {
      weatherData: [],
      cardToRemove: null,
      cityNames: ['Kyiv', 'AnotherCity'],
      error: null,
      showMaxCardsModal: false,
      isDayMode: true,
      loading: false
    }
  },

  created() {
    this.addWeatherCard()
  },
  methods: {
    toggleDayNightMode() {
      this.isDayMode = !this.isDayMode
    },
    async addWeatherCard() {
      try {
        this.loading = true
        if (this.weatherData.length < 5) {
          const data = await getWeatherData('Kyiv')
          this.weatherData.push(data)
          const newIndex = this.weatherData.length - 1
          await getHourlyTemperatureData('Kyiv', newIndex)
        } else {
          this.showMaxCardsModal = true
        }
      } catch (error) {
        console.error('Error adding weather card:', error)
        this.error = 'Failed to add weather card'
      } finally {
        this.loading = false
      }
    },

    removeWeatherCard(index) {
      this.showRemoveConfirmation = true
      this.weatherData.splice(index, 1)
    },

    addToFavorites(cityData) {
      const storedFavorites = localStorage.getItem('favoriteCities')

      const existingFavorites = storedFavorites ? JSON.parse(storedFavorites) : []

      if (existingFavorites.length < 5) {
        existingFavorites.push(cityData)

        localStorage.setItem('favoriteCities', JSON.stringify(existingFavorites))
      } else {
        this.showMaxCardsModal = true
        this.showAddToFavoritesModal = false

        console.warn('Maximum number of favorites reached (5)')
      }
    },

    closeMaxCardsModal() {
      this.showMaxCardsModal = false
    }
  }
}
</script>

<style scoped>
.toggle-day-night-btn {
  background-color: darkslateblue;
  color: white;
  padding: 5px;
  transition: background-color 0.3s ease;
}

.toggle-day-night-btn:hover {
  background-color: purple;
}
.container {
  width: 100%;
}
.container.night-mode {
  background-color: #333333;
  color: #ffffff;
}
.title {
  text-align: center;
}
.add-card-btn {
  position: fixed;
  top: 70px;
  right: 10px;
  z-index: 1000;
  border: 2px solid green;
  padding: 10px;
  background-color: #2eb32a;
}
.add-card-btn:hover {
  background-color: #98e999;
}

.max-cards-message {
  color: red;
}
</style>
