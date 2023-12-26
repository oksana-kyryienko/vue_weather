import Chart from 'chart.js/auto'
import { convertKelvinToCelsius } from '@/utils/convertTemperature'

export function createChart(canvas, data) {

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: data.data.map((temperature) => convertKelvinToCelsius(temperature)),
          borderColor: 'blue',
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      layout: {
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
  })

  return chart
}
