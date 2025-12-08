<script setup lang="ts">
import {useAuthStore} from "~/stores/authStore";
import type {ValidationResponse} from "~/types/models/Validation";

const authStore = useAuthStore()
const router = useRouter()

const email = ref<string>("")
const password = ref<string>("")
const errors = ref<string | undefined>(undefined)

const login = async () => {
  errors.value = undefined;

  const response: ValidationResponse = await authStore.login(email.value, password.value);

  if (!response.success) {
    errors.value = response.message;
    return;
  }

  await router.push("/")
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="bg-white p-10 rounded-lg shadow-lg w-96">

      <div>
        <label class="text-md font-bold mb-5 block">
          E-mail
        </label>

        <input
            class="w-full border border-gray-300 p-2 rounded-lg mb-5"
            type="text"
            v-model="email"
        />
      </div>

      <div>
        <label class="text-md font-bold mb-5 block">
          Password
        </label>

        <input
            class="w-full border border-gray-300 p-2 rounded-lg mb-5"
            type="password"
            v-model="password"
        />
      </div>

      <div class="mt-5">
        <div
            v-if="errors"
            style="color:red;"
        >
          {{ errors }}
        </div>

        <button
            class="bg-[#706CA1] hover:bg-[#8884c2] active:bg-[#4c4a6b] text-[#dedede] px-4 py-2 rounded-lg"
            @click="login"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>