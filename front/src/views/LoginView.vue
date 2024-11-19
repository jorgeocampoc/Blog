
<script setup>
import {ref, onMounted} from 'vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import {useRouter} from 'vue-router';
const currentForm = ref('login')
const router = useRouter()
const changeForm = ( ) =>{
    console.log('form');
    currentForm.value = (currentForm.value == 'login')? 'register':'login';
}

onMounted(()=>{
  localStorage.clear()
})

</script>
<template>
<div>
  <main class="content bg-light d-flex justify-content-center align-items-center bg-secondary" >
    <Login v-if="currentForm == 'login'" @changeForm="changeForm()" class="animate__animated  animate__fadeIn"/>
    <Register v-if="currentForm == 'register'" @changeForm="changeForm()" class="animate__animated  animate__fadeIn"/>
</main>
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
