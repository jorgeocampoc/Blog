<script setup>
import Navbar from './components/Navbar.vue'
import {ref, onMounted} from 'vue';
import { getUser } from './helpers/utilities';
const user = ref(null)
onMounted( async()=>{
  user.value = await getUser()
})


</script>

<template>
  <div>
    <Navbar />
    <RouterLink/>
  <RouterView />
  </div>
</template>

