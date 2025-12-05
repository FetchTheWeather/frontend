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

// TODO 2. Post data
// TODO 3. Check response (200 = Goed, 401 = Verkeerde login, 400 = Verkeerde data)
// TODO 4. Save data
</script>

<template>
  <body>
  <div>
    <label>E-mail</label>
    <input type="text" v-model="email"/>
    <label>Password</label>
    <input type="password" v-model="password"/>
    <div v-if="errors" style="color:red;">{{ errors }}</div>
    <button @click="login">Login</button>
  </div>

  </body>
</template>

<style scoped>

</style>