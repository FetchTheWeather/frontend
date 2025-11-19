<script setup language="ts">
// import('highcharts/highcharts').Options
const data = [[1763506800000, 20],[new Date().getTime(),21]];

const temperatureGraph = ref({
  chart: {
    zooming: {
      type: 'x'
    }
  },
  title: {
    text: 'AAAA I HATE MY LIFE'
  },
  subtitle: {
    text: 'Pinch the chart to zoom in'
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: 'Graden Celcius'
    }
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    area: {
      marker: {
        radius: 2
      },
      lineWidth: 1,
      color: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, 'rgb(199, 113, 243)'],
          [0.7, 'rgb(76, 175, 254)']
        ]
      },
      states: {
        hover: {
          lineWidth: 5
        }
      },
      threshold: null
    }
  },

  series: [{
    type: 'area',
    name: 'Graden Celcius',
    data: data
  }]
})
</script>
<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <div class="m-[100px] flex justify-between">
    <div>
      <p class="bold text-6xl">Data:</p>
      <p class="text-4xl">Temperature:</p>
      <p class="text-4xl">Raining:</p>
      <p class="text-4xl">Humidity:</p>
      <p class="text-4xl">Air pressure:</p>
      <p class="text-4xl">Air quality:</p>
      <p class="text-4xl">Time:</p>
    </div>
    <div>
      <img src="/media/png-transparent-rain-rain-blue-cloud-drop-thumbnail.png">
    </div>
  </div>
  <highchart
      :options="temperatureGraph"
      :update="['options.title', 'options.series']"
  />
</template>
