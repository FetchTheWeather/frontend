<script setup lang="ts">

import FooterComponent from "~/components/footerComponent.vue";
</script>

<!--<template>-->
<!--  <header-component/>-->
<!--  <NuxtPage/>-->
<!--  <footer-component/>-->
<!--</template>-->
<template>
    <div class="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header>
        <header-component/>
      </header>

      <main>
        <NuxtPage/>
      </main>

      <footer>
        <footer-component/>
      </footer>
    </div>
</template>
<style scoped>

</style>