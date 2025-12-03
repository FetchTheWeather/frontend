<script setup lang="ts">
import type {Collectable} from "~/types/models/Collectable";

const name: string = "john mcjohn"
const email: string = "john@johnmail.com"

// /api/collection
const collection: Collectable[] = [
  {id: "1", name: "test achievement, please ignore"},
  {id: "2", name: "test achievement, please ignore"},
  {id: "3", name: "test achievement, please ignore"},
  {id: "4", name: "test achievement, please ignore"},
  {id: "5", name: "test achievement, please ignore"},
  {id: "6", name: "test achievement, please ignore"},
  {id: "7", name: "test achievement, please ignore"},
  {id: "8", name: "test achievement, please ignore"},
  {id: "9", name: "test achievement, please ignore"},
  {id: "10", name: "test achievement, please ignore"},
  {id: "11", name: "test achievement, please ignore"},
  {id: "12", name: "test achievement, please ignore"},
  {id: "13", name: "test achievement, please ignore"},
  {id: "14", name: "test achievement, please ignore"},
  {id: "15", name: "test achievement, please ignore"},
  {id: "16", name: "test achievement, please ignore"},
  {id: "17", name: "test achievement, please ignore"},
  {id: "18", name: "test achievement, please ignore"},
  {id: "19", name: "test achievement, please ignore"},
  {id: "20", name: "test achievement, please ignore"},
  {id: "21", name: "test achievement, please ignore"}
]

// /api/collection/{userId}
const unlocked: string[] = [
  "2", "3", "4", "9", "14", "1"
]

const isUnlocked = (id: string) => {
  return unlocked.find((str) => str === id) != undefined;
}
</script>

<template>
  <div class="m-[100px] flex justify-between">
    <div>
      <p class="text-4xl mb-[20px]">
        Naam: {{name}}
      </p>
      <p class="text-4xl mb-[20px]">
        Email: {{email}}
      </p>
      <p class="text-4xl mb-[50px]">Collectie:</p>
      <div class="p-[20px] flex justify-evenly flex-wrap bg-[#ddd] rounded-3xl mr-[100px]">
        <div class="m-[30px]" v-for="collectable in collection">
          <img v-if="isUnlocked(collectable.id)" src="/media/unlocked.png" alt="">
          <img v-else src="/media/not_unlocked.png" alt="">
        </div>
      </div>
    </div>
    <div class="min-w-[500px] max-w-[500px]">
      <img class="rounded-3xl" src="/media/png-transparent-rain-rain-blue-cloud-drop-thumbnail.png" alt="">
      <div class="h-[calc(100%_-_500px)] flex flex-col justify-center">
        <div class="flex justify-between h-fit">

          <!--TODO make the buttons functional-->

          <button class="bg-[#706ca1] hover:bg-[#8884c2] active:bg-[#4c4a6b] m-[10px] p-[10px] text-[#dedede] rounded-full">email veranderen</button>
          <button class="bg-[#706ca1] hover:bg-[#8884c2] active:bg-[#4c4a6b] m-[10px] p-[10px] text-[#dedede] rounded-full">profielfoto veranderen</button>
          <button class="bg-[#706ca1] hover:bg-[#8884c2] active:bg-[#4c4a6b] m-[10px] p-[10px] text-[#dedede] rounded-full">wachtwoord veranderen</button>
          <button class="bg-[#ff4747] hover:bg-[#fc6060] active:bg-[#f72a2a] m-[10px] p-[10px] text-[#dedede] rounded-full">uitloggen</button>
        </div>
      </div>
    </div>
  </div>
  <div class="m-[100px]">
  </div>


</template>

<style scoped>
</style>