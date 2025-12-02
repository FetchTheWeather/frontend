<script setup lang="ts">
const loggedIn:boolean = true
</script>

<template>
  <div class=" bg-[#706CA1] w-full border p-[15px] flex justify-between">
    <div>
      <h1><a href="/">Fetch the weather</a></h1>
    </div>
    <div>
      <p v-if="loggedIn"><a href="/profile">Welcome name!</a></p>
      <p v-else-if="!loggedIn"><a href="/login">Log in</a></p>
    </div>
  </div>


</template>

<style scoped>

</style>