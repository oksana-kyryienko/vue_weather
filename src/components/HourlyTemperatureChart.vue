<!-- HourlyTemperatureChart.vue -->

<template>
  <div class="hourly-temperature">
    <h3>{{ $t('hourlyTemperatureChart') }}</h3>
    <canvas :ref="'temperatureChart_' + index"></canvas>
  </div>
</template>

<script>
import { createChart } from '@/utils/createChart'

export default {
  props: {
    index: Number,
    data: {}
  },
  watch: {
    'data': 'createTemperatureChart'
  },
  data() {
    return {
      temperatureChart: null
    }
  },
  methods: {
    createTemperatureChart(data) {
      this.$nextTick(() => {
        const canvas = this.$refs['temperatureChart_' + this.index]
        if (!canvas) {
          console.error('Canvas element not found for index:', this.index)
          return
        }
        if (this.temperatureChart) {
          this.temperatureChart.destroy()
        }
        this.temperatureChart = createChart(canvas, data)
      })
    }
  }
}
</script>

<style scoped>
</style>
