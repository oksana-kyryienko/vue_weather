<template>
  <div class="app">
    <MainCard v-if="isWeatherRoute" />

    <template v-else>
      <main>Hello</main>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import MainCard from '../components/MainCard.vue'

const route = useRoute()
const isWeatherRoute = computed(() => route.name === 'weather')
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
}
</style>
