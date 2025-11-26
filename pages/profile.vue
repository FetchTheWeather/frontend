<script setup lang="ts">
import type {Collectable} from "~/types/models/Collectable";

const name: string = "john mcjohn"
const email: string = "john@johnmail.com"

// /api/collection
const collection: Collectable[] = [
  {id: "d9e34622-d17e-42d9-8731-b3a984dbd8e8", name: "test achievement, please ignore 1"},
  {id: "3b35ce14-afb1-4338-a52c-42ddecb2683e", name: "test achievement, please ignore 2"}
]

// /api/collection/{userId}
const unlocked: string[] = [
  "3b35ce14-afb1-4338-a52c-42ddecb2683e"
]

// this is code written by pieter and im too confused to understand it :( so it's commented out rn

// const isUnlocked = (id: string) => {
//   // return unlocked. // TODO - Find in unlocked array
//   return false;
// }
</script>

<template>

  <div v-for="collectable in collection">
    <p>
      collectable.name
    </p>
  </div>

</template>

<style scoped>

</style>