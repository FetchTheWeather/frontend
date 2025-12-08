<script setup lang="ts">
import type {Collectable} from "~/types/models/Collectable";

const userData: {
  email : string
  unlockedAchievements: string[]
} =
  await $fetch(`https://ftw.pietr.dev/auth/identity/me`, {
    method: 'GET',
    headers: {'authorization': `Bearer ${useAuthStore().loginResponse?.token}`}
});

const email = ref<string>(userData.email);

const router = useRouter()

const unlocked = ref<string[]>(userData.unlockedAchievements);

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

const isUnlocked = (id: string) => {
  return unlocked.value.find((str) => str === id) != undefined;
}

const logOut = async () => {
  await router.push("/")
}

const changeEmail = () => {
  let newEmail = prompt("Vul een nieuwe email in:", "email@example.com")
  $fetch('https://ftw.pietr.dev/auth/manage/info', {
    method: 'POST',
    body: {"newEmail": newEmail},
    headers: {'authorization': `Bearer ${useAuthStore().loginResponse?.token}`}
  })
  router.push("/profile")
}

const changePassword = () => {
  let oldPassword = prompt("vul je oude wachtwoord in:")
  let newPassword = prompt("Vul een nieuw wachtwoord in:")
  $fetch('https://ftw.pietr.dev/auth/manage/info', {
    method: 'POST',
    body: {
      "newPassword": newPassword,
      "oldPassword": oldPassword
    },
    headers: {'authorization': `Bearer ${useAuthStore().loginResponse?.token}`}
  })
  router.push("/profile")
}

</script>

<template>
  <div class="m-[100px] flex justify-between">
    <div>
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
      <img class="rounded-3xl" src="/media/profilePicture.png" alt="">
      <div class="h-[calc(100%_-_500px)] flex flex-col justify-center">
        <div class="flex justify-between h-fit">

          <!--TODO make the buttons functional-->

<!--          <button @click="changeEmail()" class="bg-[#706ca1] hover:bg-[#8884c2] active:bg-[#4c4a6b] m-[10px] p-[10px] text-[#dedede] rounded-full">email veranderen</button>-->
<!--          <button class="bg-[#706ca1] hover:bg-[#8884c2] active:bg-[#4c4a6b] m-[10px] p-[10px] text-[#dedede] rounded-full">profielfoto veranderen</button>-->
          <button @click="changePassword()" class="bg-[#706ca1] hover:bg-[#8884c2] active:bg-[#4c4a6b] m-[10px] p-[10px] text-[#dedede] rounded-full">wachtwoord veranderen</button>
          <button @click="useAuthStore().logOut(); logOut()" class="bg-[#ff4747] hover:bg-[#fc6060] active:bg-[#f72a2a] min-w-[45%] m-[10px] p-[10px] text-[#dedede] rounded-full">uitloggen</button>
        </div>
      </div>
    </div>
  </div>
  <div class="m-[100px]">
  </div>


</template>

<style scoped>
</style>