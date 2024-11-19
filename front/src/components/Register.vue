<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const fullName = ref('')
const register = async () => {
  const data = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
  }
  try {
    await axios.post(`http://localhost:3000/users/`, data);
    alert('Usuario registrado')
    router.push('login')
  } catch (error) {
    console.log(error);
  }

}
</script>
<template>
  <div class="col-10  d-flex justify-content-center">
    <div class="card p-4 shadow">
      <div class="card-body">
        <h1 class="card-title text-center py-3">Registro</h1>
        <form @submit.prevent="register">
          <div class="px-5 my-3">
            <label for="name">Full name</label>
            <input type="text" class="form-control" id="name" v-model="fullName" required>
          </div>
          <div class="px-5 my-3">
            <label for="email">Correo</label>
            <input type="text" class="form-control" id="email" v-model="email" required>
          </div>
          <div class="px-5 my-3">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
          </div>
          <div class="row px-5 m-auto">
            <button class="btn btn-primary  rounded-5" type="submit">
              Ingresar
            </button>
            <a class="text-end mt-3   " @click="$emit('changeForm')">Ir a login</a>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 100vw;
  height: 100vh;
}

.card {
  width: 50%;
  height: 50%;
}
</style>
