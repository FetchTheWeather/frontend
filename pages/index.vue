<script setup lang="js">

const hour = 3600000;

const day = 0;

const twoDays = 86400000;

const threeDays = 172800000;

const week = 604800000;

const rangeTypeButton = ref(day);

const userStartRange = ref()

const userEndRange = ref()

const fetchData = ref();

const temperatureData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime() + hour,
      Math.round(val.temperatureCelsius * 100)/100
    ])
  }

  return data;
});

const humidityData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime() + hour,
      Math.round(val.humidityPercent * 100) / 100
    ])
  }

  return data;
});

const pressureData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime() + hour,
      Math.round((val.airPressureHpa/100) * 100)/100
    ])
  }

  return data;
});

const qualityData = computed(() => {
  let data = [];

  for (let fetchDataKey in fetchData.value) {
    const val = fetchData.value[fetchDataKey];

    data.push([
      (new Date(val.timestamp)).getTime() + hour,
      Math.round(val.airQualityPpm * 100)/100
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
      lineWidth: 0.5,
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
    data: temperatureData,
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
      text: ''
    }
  },
  series: [{
    type: 'area',
    name: '%',
    data: humidityData,
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
    data: pressureData,
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
    data: qualityData,
  }]
}

const graph = ref(setupGraph)

let rangeType = day;

let currentTime = new Date();

let endRange = currentTime;

let startRange = new Date (currentTime.getTime() - rangeType);

const formatTime = (timeToFormat) => {
  if(timeToFormat.getMonth() >= 10 && timeToFormat.getDate() >= 10){
    return `${(new Date (timeToFormat)).getFullYear()}-${(new Date (timeToFormat)).getMonth() + 1}-${(new Date (timeToFormat)).getDate()}`;
  }
  else if(timeToFormat.getMonth() >= 10 && timeToFormat.getDate() < 10){
    return `${(new Date (timeToFormat)).getFullYear()}-${(new Date (timeToFormat)).getMonth() + 1}-0${(new Date (timeToFormat)).getDate()}`;
  }
  else if(timeToFormat.getMonth() < 10 && timeToFormat.getDate() >= 10){
    return `${(new Date (timeToFormat)).getFullYear()}-0${(new Date (timeToFormat)).getMonth() + 1}-${(new Date (timeToFormat)).getDate()}`;
  }
  else if(timeToFormat.getMonth() < 10 && timeToFormat.getDate() < 10){
    return `${(new Date (timeToFormat)).getFullYear()}-0${(new Date (timeToFormat)).getMonth() + 1}-0${(new Date (timeToFormat)).getDate()}`;
  }
}

const getNewData =  async (startRange, endRange) => {
  fetchData.value = await $fetch(`https://sftw.pietr.dev/ws/weather/data/range?start=${startRange}&end=${endRange}`)
}

const graphTo = (newGraph) => {
  graph.value = newGraph
}

const returnLatestData = (data) => {
  if(data.length <= 0) return "0";
  if(data[data.length - 1].length <= 0) return  "0";
  return data[data.length - 1][1]
}

const fetchFutureData = async () => {
  if(rangeTypeButton.value === day){
    endRange = new Date((endRange.getTime() + twoDays))
    startRange = new Date((startRange.getTime() + twoDays))
  }
  else{
    endRange = new Date(endRange.getTime() + rangeTypeButton.value)
    startRange = new Date(startRange.getTime() + rangeTypeButton.value)
  }
  userStartRange.value = formatTime(startRange)
  userEndRange.value = formatTime(endRange)
  imageChange()
}

const fetchPastData = async () => {
  if(rangeTypeButton.value === day){
    endRange = new Date(endRange.getTime() - twoDays)
    startRange = new Date(startRange.getTime() - twoDays)
  }
  else{
    endRange = new Date(endRange.getTime() - rangeTypeButton.value)
    startRange = new Date(startRange.getTime() - rangeTypeButton.value)
  }
  userStartRange.value = formatTime(startRange)
  userEndRange.value = formatTime(endRange)
}

const fetchCurrentData = async () => {
  currentTime = new Date();
  endRange = currentTime;
  if(rangeType === week){
    startRange = new Date(currentTime.getTime() - (currentTime.getDay() * twoDays));
  }
  else{
    startRange = new Date(currentTime.getTime() - rangeType);
  }
  userStartRange.value = formatTime(startRange)
  userEndRange.value = formatTime(endRange)
}

const imageChange = () => {
  if(temperatureData.value.length <= 0) {
  }
  else if(returnLatestData(temperatureData.value) <= 5){
    document.getElementById("weatherImg").src="/media/cold.jpg";
  }
  else if(returnLatestData(temperatureData.value) <= 25){
    document.getElementById("weatherImg").src="/media/normal.jpg";
  }
  else{
    document.getElementById("weatherImg").src="/media/hot.jpg";
  }
}

const rangeTypeTo = (type) => {
  rangeType = type
  fetchCurrentData()
}

const rangeTypeButtonTo = (type) => {
  rangeTypeButton.value = type
}

onMounted(()=>{
  userStartRange.value = formatTime(startRange)
  userEndRange.value = formatTime(endRange)
})

watch(userStartRange, async () => {
  startRange = new Date(userStartRange.value)
  await getNewData(userStartRange.value, userEndRange.value)
  imageChange()
})

watch(userEndRange, async () => {
  endRange = new Date(userEndRange.value)
  await getNewData(userStartRange.value, userEndRange.value)
  imageChange()
})

</script>
<template>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <div class="m-[100px] flex justify-between">
    <div>
      <p class="bold text-6xl">Data:</p>

      <p class="text-4xl">
        Temperatuur: {{returnLatestData(temperatureData)}} &deg;C
      </p>

      <p class="text-4xl">
        Luchtvochtigheid: {{returnLatestData(humidityData)}}%
      </p>

      <p class="text-4xl">
        Luchtdruk: {{returnLatestData(pressureData)}} hPs
      </p>

      <p class="text-4xl">
        Luchtkwaliteit: {{returnLatestData(qualityData)}} ppm
      </p>
      <p class="text-4xl">
        Begindatum data:
        <input
            v-model="userStartRange"
            type="date"
        />
      </p>
      <p class="text-4xl">
        Einddatum data:
        <input
            v-model="userEndRange"
            type="date"
        />
      </p>
    </div>
    <div>
      <img src="/media/normal.jpg" id="weatherImg" class="rounded-2xl">
    </div>
  </div>
  <div class="m-[100px] flex justify-between">
    <div class="group relative inline-block dropdown">

      <button class="bg-[#706ca1] p-[10px] text-[#dedede] rounded-full">Wissel grafiek &blacktriangledown;</button>

      <div class="dropdown-content hidden absolute z-[1] max-w-[100%] text-center bg-[#e2e2e2] bg-opacity-80 rounded-xl">
        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(temperatureGraph)">Temperatuur over tijd</div>

        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(humidityGraph)">Luchtvochtigheid over tijd</div>

        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(pressureGraph)">Luchtdruk over tijd</div>

        <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="graphTo(qualityGraph)">Luchtkwaliteit over tijd</div>
      </div>
    </div>
    <div class="flex justify-between">
      <div class="group relative inline-block dropdown mr-[10px]">

        <button class="bg-[#706ca1] p-[10px] text-[#dedede] rounded-full">Wissel grafiek spronggrootte &blacktriangledown;</button>

        <div class="dropdown-content hidden absolute z-[1] min-w-[100%] text-center bg-[#e2e2e2] bg-opacity-80 rounded-xl">
          <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="rangeTypeButtonTo(day)">dag</div>

          <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="rangeTypeButtonTo(twoDays)">twee dagen</div>

          <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="rangeTypeButtonTo(threeDays)">drie dagen</div>

          <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="rangeTypeButtonTo(week)">week</div>
        </div>
      </div>
      <div class="group relative inline-block dropdown">

        <button class="bg-[#706ca1] p-[10px] text-[#dedede] rounded-full">Wissel grafiek berijk &blacktriangledown;</button>

        <div class="dropdown-content hidden absolute z-[1] min-w-[100%] text-center bg-[#e2e2e2] bg-opacity-80 rounded-xl">
          <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="rangeTypeTo(day)">dag</div>

          <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="rangeTypeTo(twoDays)">twee dagen</div>

          <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="rangeTypeTo(threeDays)">drie dagen</div>

          <div class="p-[5px] rounded-xl cursor-pointer hover:bg-[#ddd]" @click="rangeTypeTo(week)">week</div>
        </div>
      </div>
    </div>
  </div>
  <highchart class="m-[100px]"
      :options="graph"
      :update="['options.title', 'options.series', 'options.yAxis']"
  />
  <div class="m-[100px] flex justify-between">
    <button class="p-[5px] rounded-xl bg-[#706ca1] text-[#dedede] hover:bg-[#8884c2] active:bg-[#4c4a6b]" @click="fetchPastData()">
      <span v-if="rangeTypeButton===day">&leftarrow; een dag terug</span>
      <span v-else-if="rangeTypeButton===twoDays">&leftarrow; twee dagen terug</span>
      <span v-else-if="rangeTypeButton===threeDays">&leftarrow; drie dagen terug</span>
      <span v-else-if="rangeTypeButton===week">&leftarrow; een week terug</span>
    </button>
    <button class="p-[5px] rounded-xl bg-[#706ca1] text-[#dedede] hover:bg-[#8884c2] active:bg-[#4c4a6b]" @click="fetchCurrentData()">huidige data</button>
    <button class="p-[5px] rounded-xl bg-[#706ca1] text-[#dedede] hover:bg-[#8884c2] active:bg-[#4c4a6b]" @click="fetchFutureData()">
      <span v-if="rangeTypeButton===day">een dag vooruit &rightarrow;</span>
      <span v-else-if="rangeTypeButton===twoDays">twee dagen vooruit &rightarrow;</span>
      <span v-else-if="rangeTypeButton===threeDays">drie dagen vooruit &rightarrow;</span>
      <span v-else-if="rangeTypeButton===week">een week vooruit &rightarrow;</span>
    </button>
  </div>
</template>
<style scoped>
.dropdown:hover .dropdown-content {display: block;}
</style>