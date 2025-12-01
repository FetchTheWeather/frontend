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
    data: [[[0,1],[1,1]],[[0,1],[1,1]]],
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
        Temperatuur: {{getLatestData(temperatureData)}} &deg;C
      </p>

      <p class="text-4xl">
        Regen:
        <span v-if="getLatestData(rainData) === 1"> Ja</span>
        <span v-else> Nee</span>
      </p>

      <p class="text-4xl">
        Regenhoeveelheid:{{getLatestData(rainAmountData)}}mm/s
      </p>

      <p class="text-4xl">
        Luchtvochtigheid: {{getLatestData(humidityData)}}%
      </p>

      <p class="text-4xl">
        Luchtdruk: {{getLatestData(pressureData)}} hPs
      </p>

      <p class="text-4xl">
        Windsnelheid: {{getLatestData(windSpeedData)}} Km/h
      </p>

      <p class="text-4xl">
        Tijd: {{getLatestTime()}}
      </p>
    </div>
    <img src="/media/png-transparent-rain-rain-blue-cloud-drop-thumbnail.png">
  </div>
  <div class="m-[100px]">
    <div class="group relative inline-block dropdown">

      <button class="bg-[#706ca1] p-[10px] rounded-full">Wissel grafiek</button>

      <div class="dropdown-content hidden absolute z-[1] bg-[#e2e2e2] bg-opacity-80 rounded-xl">
        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(temperatureGraph)">Temperatuur over tijd</div>

        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(rainGraph)">Regen over tijd</div>

        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(humidityGraph)">Luchtvochtigheid over tijd</div>

        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(pressureGraph)">Luchtdruk over tijd</div>

       <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(windSpeedGraph)">Windsnelheid over tijd</div>
      </div>
    </div>
  </div>
  <highchart class="m-[100px]"
      :options="graph"
      :update="['options.title', 'options.series']"
  />
</template>
<style scoped>
.dropdown:hover .dropdown-content {display: block;}
</style>