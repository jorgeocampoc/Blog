
<script setup>
import { getUser } from '@/helpers/utilities';
import router from '@/router';
import {ref, onMounted,watch} from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null)

onMounted( async()=>{
  user.value = await getUser();
  console.log(user.value);
})

const logout = ()=>{
  localStorage.clear()
  router.push('login')
}


</script>

<template>
  <main class="content">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand ms-5" href="#">Navbar</a>
      <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 mx-3">
         <RouterLink to="/" class="nav-link">
          <li class="nav-item active">
              Blogs
          </li>
         </RouterLink>
         <RouterLink to="blog" class="nav-link mx-3">
          <li class="nav-item active">
              Mis blogs
          </li>
         </RouterLink>
          <li class="nav-item active nav-link mx-3" @click="logout">
            <img src="../assets/svg/exit.svg" width="25" alt="">
          </li>
        
         </ul>
      </div>
    </nav>
</main>
</template>

<style scoped>
.content{
  width: 100vw;
}
</style>