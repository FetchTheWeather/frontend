<script setup lang="ts">
const loggedIn:boolean = true
</script>

<template>
  <div class=" bg-[#706CA1] text-[#dedede] rounded-b-[40px] pl-[100px] pr-[100px] flex justify-between">
    <div class="content-center text-3xl">
      <h1><a href="/">Fetch the weather</a></h1>
    </div>
    <div>
      <div v-if="loggedIn">
        <a href="/profile" class="flex justify-between">
          <div class="content-center text-2xl">
            <p>Welcome name!</p>
          </div>
          <div class="w-[50px] m-[15px] rounded-full">
            <img src="/media/png-transparent-rain-rain-blue-cloud-drop-thumbnail.png" class="rounded-full">
          </div>
        </a>
      </div>
      <div v-else-if="!loggedIn">
        <p><a href="/login">Log in</a></p>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>