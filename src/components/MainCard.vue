<!-- MainCard.vue -->
<template>
  <div :class="['container', { 'night-mode': !isDayMode }]">
    <button @click="toggleDayNightMode" class="toggle-day-night-btn">
      {{ isDayMode ? 'Switch to Night Mode' : 'Switch to Day Mode' }}
    </button>
    <h2 class="title">Weather Information</h2>
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
      <button @click="addWeatherCard" class="add-card-btn">Add Weather Card</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>

    <message-error-modal
      :visible="showMaxCardsModal"
      :customStyles="{ width: '300px', height: '150px' }"
      :errorMessage="'Maximum number of cards reached (5). Please remove the card to add a new card'"
      @close-modal="closeMaxCardsModal"
    />
  </div>
</template>

<script>
import { getHourlyTemperatureData, getWeatherData } from '@/api/weatherApi'
import WeatherCard from '@/components/WeatherCard.vue'
import MessageErrorModal from '@/components/Modals/MessageErrorModal.vue'

export default {
  components: {
    WeatherCard,
    MessageErrorModal
  },
  emits: ['remove', 'remove-from-favorites', 'add-to-favorites'],

  data() {
    return {
      weatherData: [],
      cardToRemove: null,
      cityNames: ['Kyiv', 'AnotherCity'],
      error: null,
      showMaxCardsModal: false,
      isDayMode: true
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
