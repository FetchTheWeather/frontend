<script setup lang="ts">
const loggedIn:boolean = true
</script>

<template>
  <div class=" bg-[#706CA1] text-[#dedede] rounded-b-[40px] pl-[100px] pr-[100px] flex justify-between">
    <div class="content-center text-3xl">
      <h1><nuxt-link to="/">Fetch the weather</nuxt-link></h1>
    </div>
    <div>
      <div v-if="loggedIn">
        <nuxt-link to="/profile" class="flex justify-between">
          <div class="content-center text-2xl">
            <p>Welkom name!</p>
          </div>
          <div class="w-[50px] m-[15px] rounded-full">
            <img src="/media/profilePicture.png" class="rounded-full">
          </div>
        </nuxt-link>
      </div>
      <div v-else-if="!loggedIn">
        <p><nuxt-link to="/login">Log in</nuxt-link></p>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>