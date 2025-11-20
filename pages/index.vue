<script setup language="ts">
// import('highcharts/highcharts').Options
const temperatureData = [[1763506800000, 20],[1763590000000, 22],[1763593200000, 21]];

const rainData = [[1763506800000, 1],[1763590000000, 0],[1763593200000, 1]];

const humidityData = [[1763506800000, 1.42],[1763590000000, 1.4],[1763593200000, 1.43]];

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
    name: 'Regen',
    data: [0,0]
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
    data: temperatureData
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
    name: 'Regen',
    data: rainData
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
    name: 'g/kg',
    data: humidityData
  }]
}

const graph = ref(theSacifice)

const graphTo = (newGraph) => {
  graph.value = newGraph
}
// onMounted(() => {
//   graphTo(theSacifice);
//   graphTo(temperatureGraph);
// })
</script>
<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <div class="m-[100px] flex justify-between">
    <div>
      <p class="bold text-6xl">Data:</p>
      <p class="text-4xl">Temperatuur:</p>
      <p class="text-4xl">Regen:</p>
      <p class="text-4xl">Luchtvochtigheid:</p>
      <p class="text-4xl">Luchtdruk:</p>
      <p class="text-4xl">Luchtkwailiteit:</p>
      <p class="text-4xl">Tijd:</p>
    </div>
    <div>
      <img src="/media/png-transparent-rain-rain-blue-cloud-drop-thumbnail.png">
    </div>
  </div>

  <div class="dropdown">
    <button class="dropbtn">Dropdown</button>
    <div class="dropdown-content">
      <a @click="graphTo(temperatureGraph)">Temperature over time</a>
      <a @click="graphTo(rainGraph)">Rain over time</a>
      <a @click="graphTo(humidityGraph)">Humidity over time</a>
      <a @click="graph.series.data = humidityData">Air pressure over time</a>
      <a onclick="graphToQuality()">Air quality over time</a>
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
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {background-color: #3e8e41;}
</style>