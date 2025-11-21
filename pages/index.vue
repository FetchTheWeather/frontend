<script setup language="ts">
// import('highcharts/highcharts').Options
const temperatureData = ref([[1763506800000, 20],[1763590000000, 22],[1763593200000, 21]]);

const rainData = ref([[1763506800000, 1],[1763590000000, 0],[1763593200000, 1]]);

const humidityData = ref([[1763506800000, 1.42],[1763590000000, 1.4],[1763593200000, 1.43]]);

const pressureData = ref([[1763506800000, 1003.42],[1763590000000, 1022.4],[1763593200000, 1023.43]]);

const qualityData = ref([[1763506800000, 2032],[1763590000000, 2040],[1763593200000, 2041]]);

const theSacifice = {
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
    data: [0]
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
    data: rainData.value,
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

const qualityGraph = {
  chart: {
    zooming: {
      type: 'x'
    }
  },
  title: {
    text: 'Luchtkwaliteit over tijd'
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: 'deeltjes per miljoen (ppm)'
    }
  },
  series: [{
    type: 'area',
    name: 'ppm',
    data: qualityData.value,
  }]
}

const graph = ref(theSacifice)

const graphTo = (newGraph) => {
  graph.value = newGraph
}

const getLatestData = (data) => {
  console.log(data.length)
  return data[data.length - 1][1]
}

const getLatestTime = () => {
  let time = new Date(temperatureData.value[temperatureData.value.length - 1][0])
  return time.toLocaleString()
}

const hotswap = () => {
  let temporaryData = temperatureData.value
  temporaryData[temporaryData.length - 1][1] = -temporaryData[temporaryData.length - 1][1]
  temperatureData.value = temporaryData
}

// onMounted(() => {
//   graph.value = temperatureGraph;
// })
</script>
<template>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  {{temperatureData.value}}

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
  <button @click="hotswap">click me plssss</button>
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