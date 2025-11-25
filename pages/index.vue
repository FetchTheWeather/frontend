<script setup lang="ts">

import type {WeatherData} from "~/types/models/WeatherData";

const {
  data: fetchData
} = useFetch<WeatherData[]>("http://localhost:5194/ws/weather/data")

// const temperatureData = ref([]);
// const temperatureData = computed(() => {
//   let data= [];
//
//   for (let fetchDataKey in fetchData.value) {
//     const val = fetchData.value[fetchDataKey];
//
//     data.push([
//       (new Date(val.timestamp)).getTime(),
//       val.temperatureCelsius
//     ])
//   }
//
//   return data;
// });
//

</script>
<template>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  {{temperatureData}}

  <div class="m-[100px] flex justify-between">
    <div>
      <p class="bold text-6xl">Data:</p>

      <p class="text-4xl">
        <span>Temperatuur:</span> <span>{{getLatestData(temperatureData)}}</span> <span>&deg;C</span>
      </p>

      <p class="text-4xl">
        <span>Regen:</span>
        <span v-if="getLatestData(rainData) === 1"> Ja</span>
        <span v-else> Nee</span>
      </p>

      <p class="text-4xl">
         <span>Luchtvochtigheid:</span> <span>{{getLatestData(humidityData)}}</span> <span>g/kg</span>
      </p>

      <p class="text-4xl">
        <span>Luchtdruk:</span> <span>{{getLatestData(pressureData)}}</span> <span>hPs</span>
      </p>

      <p class="text-4xl">
        <span>Luchtkwaliteit:</span> <span>{{getLatestData(qualityData)}}</span> <span>ppm</span>
      </p>

      <p class="text-4xl">
        <span>Tijd:</span> <span>{{getLatestTime()}}</span>
      </p>
    </div>
    <img src="/media/png-transparent-rain-rain-blue-cloud-drop-thumbnail.png">
  </div>
  <div>
    <div class="dropdown">

      <button class="dropbtn">Dropdown</button>

      <div class="dropdown-content">
        <div @click="graphTo(temperatureGraph)">Temperatuur over tijd</div>

        <div @click="graphTo(rainGraph)">Regen over tijd</div>

        <div @click="graphTo(humidityGraph)">Luchtvochtigheid over tijd</div>

        <div @click="graphTo(pressureGraph)">Luchtdruk over tijd</div>

       <div @click="graphTo(qualityGraph)">Luchtkwaliteit over tijd</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Dropdown Button */
.dropbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content div {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content div:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {background-color: #3e8e41;}
</style>