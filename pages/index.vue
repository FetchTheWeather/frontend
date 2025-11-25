<script setup lang="js">

const {
  data: fetchData
} = useFetch("http://localhost:5194/ws/weather/data")


const temperatureData = computed(() => {
  let data= [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime(),
      val.temperatureCelsius
    ])
  }

  return data;
});

const rainData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime(),
      val.isRaining
    ])
  }

  return data;
});

const rainAmountData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime(),
      val.rainfallMm
    ])
  }

  return data;
});

const humidityData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime(),
      val.humidityPercent //TODO percent??????
    ])
  }

  return data;
});

const pressureData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime(),
      val.airPressureHpa
    ])
  }

  return data;
});

const windSpeedData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime(),
      val.windSpeedKph
    ])
  }

  return data;
});

const setupGraph = {
  chart: {
    zooming: {
      type: 'x'
    }
  },
  title: {
    text: 'klik links om de grafiek aan te passen'
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: ''
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
          [0, '#706ca1'],
          [1, '#ffffff']
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
    name: '',
    data: [0],
  }]
}

const temperatureGraph = {
  chart: {
    zooming: {
      type: 'x'
    }
  },
  title: {
    text: 'Temperatuur over tijd',
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: 'Graden Celcius (°C)'
    }
  },
  series: [{
    type: 'area',
    name: '°C',
    data: temperatureData.value,
  }]
}

const rainGraph = {
  chart: {
    zooming: {
      type: 'x'
    }
  },
  title: {
    text: 'Regen over tijd'
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: 'Regen'
    }
  },
  series: [{
    type: 'area',
    name: 'Regen',
    data: rainAmountData.value,
  }]
}

const humidityGraph = {
  chart: {
    zooming: {
      type: 'x'
    }
  },
  title: {
    text: 'Luchtvochtigheid over tijd'
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: 'gram water per kilogram lucht (g/kg)'
    }
  },
  series: [{
    type: 'area',
    name: 'g/kg',
    data: humidityData.value,
  }]
}

const pressureGraph = {
  chart: {
    zooming: {
      type: 'x'
    }
  },
  title: {
    text: 'Luchtdruk over tijd'
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: 'hectopascal (hPs)'
    }
  },
  series: [{
    type: 'area',
    name: 'hPs',
    data: pressureData.value,
  }]
}

const windSpeedGraph = {
  chart: {
    zooming: {
      type: 'x'
    }
  },
  title: {
    text: 'windsnelheid over tijd'
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: 'kilometer per uur (Km/h)'
    }
  },
  series: [{
    type: 'area',
    name: 'Km/h',
    data: windSpeedData.value,
  }]
}

const graph = ref(setupGraph)

const graphTo = (newGraph) => {
  console.log(graph.value)
  console.log(newGraph)
  graph.value = newGraph
}

const getLatestData = (data) => {
  return data[data.length - 1][1]
}

const getLatestTime = () => {
  let time = new Date(temperatureData.value[temperatureData.value.length - 1][0])
  return time.toLocaleString()
}

</script>
<template>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

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
        <span>Regenhoeveelheid:</span> <span>{{getLatestData(rainAmountData)}}</span> <span>mm/s</span>
      </p>

      <p class="text-4xl">
         <span>Luchtvochtigheid:</span> <span>{{getLatestData(humidityData)}}</span> <span>%</span>
      </p>

      <p class="text-4xl">
        <span>Luchtdruk:</span> <span>{{getLatestData(pressureData)}}</span> <span>hPs</span>
      </p>

      <p class="text-4xl">
        <span>Windsnelheid:</span> <span>{{getLatestData(windSpeedData)}}</span> <span>Km/h</span>
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

       <div @click="graphTo(windSpeedGraph)">Windsnelheid over tijd</div>
      </div>
    </div>
  </div>
  <highchart
      :options="graph"
      :update="['options.title', 'options.series']"
  />
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