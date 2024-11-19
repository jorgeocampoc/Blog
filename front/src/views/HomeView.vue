
<script setup>
import axios from 'axios'
import {ref, onMounted } from 'vue';
const blogs = ref([])

onMounted(()=>{
  getBlogs()
})

const currentPage = ref(1)

const getBlogs =async () =>{
  const headers = {
  'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwiZnVsbF9uYW1lIjoiam9yZ2UyIiwiZW1haWwiOiJqb3JnZTNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMifSwiaWF0IjoxNzMxOTg5Mjk1LCJleHAiOjE3MzIwMjUyOTV9.RPdHlwwl4dHCMgJn6hreJxIRW19ZlO6Sna83jOSUi1Y`,
  'Content-type':'application/json',
  'Accept':'application/json'
}
  try {
    const { data } = await axios.get('http://localhost:3000/blogs')
    blogs.value = data.results;
    console.log(blogs.value);
  } catch (error) {
    console.log(error);
  }
}
</script>


<template>
  <main class="content">
    <div class="container">
      <h1 class="text-center fs-2 my-3">BLOGS</h1>
      <div class="card">
        <div class="card-body">
            <ul class="" v-for="blog in blogs" :key="blog" >
              <li class="py-2" >
                <div class="card">
                  <div class="card-body">
                    <h5> <strong>Titulo</strong> {{ blog.titulo }}</h5>
                    <small class="my-2">Autor: {{ blog.full_name }}</small>
                <p>{{ blog.comment }}</p>
                <label class="fs-6"><strong>Fecha de posteo</strong> {{ blog.create_at }}</label>
                  </div>
                </div>
              </li>
             
            </ul>
        </div>
      </div>
    </div>
    <div class="mt-5 d-flex justify-content-center">
      <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">{{ currentPage }}</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
    </div>
</main>
</template>

<style scoped>
.content{
  width: 100vw;
}
li{
  list-style: none;
}
</style>