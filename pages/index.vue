<script setup lang="js">

const currentTime = new Date();

const fetchData = ref();

let endRange = currentTime;

let startRange = new Date(currentTime.getTime() - 604800000);

const formatTime = (referenceTime) => {
  return `${referenceTime.getFullYear()}-${referenceTime.getMonth() + 1}-${referenceTime.getDate()}`;
}

const fetchNewData =  async (startRange, endRange) => {
  fetchData.value = await $fetch(`https://ftw.pietr.dev/ws/weather/data/range?start=${startRange}&end=${endRange}`)
}

fetchNewData(formatTime(startRange), formatTime(endRange))

const temperatureData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime(),
      val.temperatureCelsius
    ])
  }

  return data;
});

// const rainData = computed(() => {
//   let data = [];
//
//   for (let fetchDataKey in fetchData.value) {
//     const val = fetchData.value[fetchDataKey];
//
//     data.push([
//       (new Date(val.timestamp)).getTime(),
//       val.isRaining
//     ])
//   }
//
//   return data;
// });
//
// const rainAmountData = computed(() => {
//   let data = [];
//
//   for (let fetchDataKey in fetchData.value) {
//     const val = fetchData.value[fetchDataKey];
//
//     data.push([
//       (new Date(val.timestamp)).getTime(),
//       val.rainfallMm
//     ])
//   }
//
//   return data;
// });

const humidityData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime(),
      val.humidityPercent
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

const qualityData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime(),
      val.airQualityPpm
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

// const rainGraph = {
//   chart: {
//     zooming: {
//       type: 'x'
//     }
//   },
//   title: {
//     text: 'Regen over tijd'
//   },
//   xAxis: {
//     type: 'datetime',
//   },
//   yAxis: {
//     title: {
//       text: 'Regen'
//     }
//   },
//   series: [{
//     type: 'area',
//     name: 'Regen',
//     data: rainAmountData.value,
//   }]
// }

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
      text: 'parts per million (ppm)'
    }
  },
  series: [{
    type: 'area',
    name: 'ppm',
    data: qualityData.value,
  }]
}

const graph = ref(setupGraph)

const graphTo = (newGraph) => {
  graph.value = newGraph
}

const getLatestData = (data) => {
  if(data.length <= 0) return "0";
  return data[data.length - 1][1]
}

const getLatestTime = () => {
  if(temperatureData.value.length <= 0) return "0";
  let time = new Date(temperatureData.value[temperatureData.value.length - 1][0])
  return time.toLocaleString()
}

const getOneWeekAgo = (referenceTime) => {
  const weakAgo = new Date(referenceTime.getTime() - 604800000);
  return formatTime(weakAgo)
}

const getOneWeekAhead = (referenceTime) => {
  const weakAgo = new Date(referenceTime.getTime() + 604800000);
  return formatTime(weakAgo)
}

const fetchFutureData = () => {
  startRange = endRange
  endRange = getOneWeekAhead(startRange)
  fetchNewData(startRange, endRange)
  imageChange()
}

const fetchPastData = () => {
  endRange = startRange
  startRange = getOneWeekAgo(endRange)
  fetchNewData(startRange, endRange)
  imageChange()
}

const imageChange = () => {
  if(temperatureData.value.length <= 0) return;
  else if(getLatestData(temperatureData) <= -6){
    document.getElementById("weatherImg").src="/media/cold.jpg";
  }
  else if(getLatestData(temperatureData) <= 25){
    document.getElementById("weatherImg").src="/media/normal.jpg";
  }
  else{
    document.getElementById("weatherImg").src="/media/hot.jpg";
  }
}

imageChange()
</script>
<template>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <div class="m-[100px] flex justify-between">
    <div>
      <p class="bold text-6xl">Data:</p>

      <p class="text-4xl">
        Temperatuur: {{getLatestData(temperatureData)}} &deg;C
      </p>

<!--      <p class="text-4xl">-->
<!--        Regen:-->
<!--        <span v-if="getLatestData(rainData) === 1"> Ja</span>-->
<!--        <span v-else> Nee</span>-->
<!--      </p>-->

<!--      <p class="text-4xl">-->
<!--        Regenhoeveelheid: {{getLatestData(rainAmountData)}} mm/s-->
<!--      </p>-->

      <p class="text-4xl">
        Luchtvochtigheid: {{getLatestData(humidityData)}}%
      </p>

      <p class="text-4xl">
        Luchtdruk: {{getLatestData(pressureData)}} hPs
      </p>

      <p class="text-4xl">
        Luchtkwaliteit: {{getLatestData(qualityData)}} ppm
      </p>

      <p class="text-4xl">
        Tijd: {{getLatestTime()}}
      </p>
    </div>
    <div>
      <img src="/media/normal.jpg" id="weatherImg" class="rounded-2xl">
    </div>
  </div>
  <div class="m-[100px]">
    <div class="group relative inline-block dropdown">

      <button class="bg-[#706ca1] p-[10px] text-[#dedede] rounded-full">Wissel grafiek &blacktriangledown;</button>

      <div class="dropdown-content hidden absolute z-[1] bg-[#e2e2e2] bg-opacity-80 rounded-xl">
        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(temperatureGraph)">Temperatuur over tijd</div>

<!--        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(rainGraph)">Regen over tijd</div>-->

        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(humidityGraph)">Luchtvochtigheid over tijd</div>

        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(pressureGraph)">Luchtdruk over tijd</div>

       <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(qualityGraph)">Luchtkwaliteit over tijd</div>
      </div>
    </div>
  </div>
  <highchart class="m-[100px]"
      :options="graph"
      :update="['options.title', 'options.series', 'yAxis']"
  />
  <div class="m-[100px] flex justify-between">
    <button class="p-[5px] rounded-xl bg-[#706ca1] text-[#dedede] hover:bg-[#8884c2] active:bg-[#4c4a6b]" @click="fetchPastData()">&leftarrow; een week terug</button>
    <button class="p-[5px] rounded-xl bg-[#706ca1] text-[#dedede] hover:bg-[#8884c2] active:bg-[#4c4a6b]" @click="fetchFutureData()">een week vooruit &rightarrow;</button>
  </div>
</template>
<style scoped>
.dropdown:hover .dropdown-content {display: block;}
</style>