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
  {id: "21", name: "test achievement, please ignore"},
  {id: "22", name: "test achievement, please ignore"},
  {id: "23", name: "test achievement, please ignore"},
  {id: "24", name: "test achievement, please ignore"},
  {id: "25", name: "test achievement, please ignore"},
  {id: "26", name: "test achievement, please ignore"},
  {id: "27", name: "test achievement, please ignore"},
  {id: "28", name: "test achievement, please ignore"},
  {id: "29", name: "test achievement, please ignore"},
  {id: "30", name: "test achievement, please ignore"},
  {id: "31", name: "test achievement, please ignore"},
  {id: "32", name: "test achievement, please ignore"},
  {id: "33", name: "test achievement, please ignore"}
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
      <p class="text-4xl m-[20px]">
        Naam: {{name}}
      </p>
      <p class="text-4xl m-[20px]">
        Email: {{email}}
      </p>
    </div>
    <img class="rounded-3xl" src="/media/png-transparent-rain-rain-blue-cloud-drop-thumbnail.png" alt=""> <!--TODO replace with profile picture-->
  </div>
  <div class="m-[100px]">
    <p class="text-4xl">Collectie:</p>
    <div class="p-[20px] flex justify-evenly flex-wrap bg-[#ddd] rounded-3xl">
      <div class="m-[30px]" v-for="collectable in collection">
        <img v-if="isUnlocked(collectable.id)" src="/media/unlocked.png" alt="">
        <img v-else src="/media/not_unlocked.png" alt="">
      </div>
    </div>
  </div>


</template>

<style scoped>
</style>