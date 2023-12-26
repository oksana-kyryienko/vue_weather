<!-- FavoritesView.vue -->
<template>
  <div class="favorites-container">
    <h2 class="title">{{ $t('favoriteCities') }}</h2>
    <div v-if="favoriteCities.length > 0">
      <weather-card
        v-for="cityData in favoriteCities"
        :key="cityData.name"
        :initialCity="cityData.name"
        @remove-from-favorites="removeFavoriteCity(cityData)"
      
        :isFavoritePage="true"
      />
    </div>
    <div v-else>
      <p>{{ $t('noFavoriteAdd') }}.</p>
    </div>
  </div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard.vue'


export default {
  components: {
    WeatherCard
  },

  data() {
    return {
      initialFavoriteCities: [],
      favoriteCities: []
    }
  },

  created() {
    this.favoriteCities = this.getStoredFavoriteCities()
  },

  methods: {
    getStoredFavoriteCities() {
      const storedFavorites = localStorage.getItem('favoriteCities')
      return storedFavorites ? JSON.parse(storedFavorites) : []
    },

    removeFavoriteCity(cityData) {
      const updatedFavorites = this.favoriteCities.filter(
        (favoriteCity) => favoriteCity.name !== cityData.name
      )

      localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites))
      this.favoriteCities = [...updatedFavorites]
      console.log('remove favorites called')
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .favorites {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
