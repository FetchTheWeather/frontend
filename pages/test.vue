<script lang="ts" setup>
import type {WeatherData} from "~/types/models/WeatherData";

const {
  data: fetchData
} = useFetch<WeatherData[]>("http://localhost:5194/ws/weather/data")


const categories: Record<string, BulletLegendItemInterface> = {
  temperatureCelsius: { name: 'Celsius', color: '#22c55e' }
}

const AreaChartData: WeatherData[] = [
  {
    id: '123',
    weatherStationId: '123',
    temperatureCelsius: 123,
    airPressureHpa: 123,
    humidityPercent: 123,
    windSpeedKph: 123,

    isRaining: false,
    rainfallMm: 123,

    timestamp: "test"
  },
  {
    id: '321',
    weatherStationId: '321',
    temperatureCelsius: 321,
    airPressureHpa: 312,
    humidityPercent: 31,
    windSpeedKph: 321,

    isRaining: false,
    rainfallMm: 321,

    timestamp: "test"
  }
]

// const xFormatter = (tick: number, _i?: number, _ticks?: number[]): string => {
//   return `${AreaChartData[tick]?.date ?? ''}`
// }
</script>

<template>
  <AreaChart
      :data="fetchData"
      :height="260"
      y-label="Revenue"
      x-label="Month"
      :categories="categories"
      :y-num-ticks="4"
      :x-num-ticks="7"
      :y-grid-line="true"
      :legend-position="LegendPosition.TopRight"
      :hide-legend="false"
  />
<!--  :x-formatter="xFormatter"-->
</template>


