
<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios';

const router = useRouter()
const email = ref('')
const password = ref('')
const login =async () =>{
    const user = {
        email:email.value,
        password:password.value
    }
    console.log(user);
  try {

    const {data} = await axios.post(`http://localhost:3000/auth`,user)
    router.push('/')
    Swal.fire({
  title: "Bienvenido !!!",
  confirmButtonText: "Ok",
}).then((result) => {
  
  if (result.isConfirmed) {
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', JSON.stringify(data.token))
  }
});

  } catch (error) {
    Swal.fire({
        icon: "error",
        title: "Error al autenticar",
        text: "Credenciales incorrectas!",
        });
  }
}
</script>
<template>
   <div class="col-10  d-flex justify-content-center">
    <div class="card p-4 shadow">
      <div class="card-body">
        
        <h1 class="card-title text-center py-3">Login</h1>
   <form @submit.prevent="login">
     <div class="px-5 my-3">
      <label for="email" >Correo</label>
      <input type="text" class="form-control" id="email" v-model="email" required>
     </div>
     <div class="px-5 my-3">
      <label for="password" >Password</label>
      <input type="password" class="form-control" id="password" v-model="password" required>
     </div>
     <div class="row px-5 m-auto">
      <button class="btn btn-primary  rounded-5"  type="submit">
        Ingresar
      </button>
      <a class="text-end mt-3" @click="$emit('changeForm')">Registrarse</a>
     </div>
   </form>
      </div>
    </div>
   </div>
</template>

<style scoped>
.content{
  width: 100vw;
  height: 100vh;
}
.card{
  width: 50%;
  height: 50%;
}

</style>
