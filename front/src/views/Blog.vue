<template>
  <div class="container ">
    <button class="btn btn-primary btn-sm mt-3 btn-sm" data-bs-toggle="modal" data-bs-target="#modalId" @click="updateAction">Crear
      post</button>
    <div class="card mt-4 rounded shadow">
      <div class="card-body">
        <ul v-for="(blog,index) in myBlogs" :key="blog">

          <li>
            
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
            {{ index+1 }}.-   {{ blog.comment }}
                </div>
                <div><button class="btn mx-1 btn-warning btn-sm" @click="editBlog(blog)" data-bs-toggle="modal"
                    data-bs-target="#modalId">Edit</button>
                  <button class="btn mx-2 btn-danger btn-sm" @click="deleteBlog(blog.id)">Delete</button>
                </div>
              </div>
            </div>
          </li>
          <hr>

        </ul>
      </div>
      <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered " role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title m-auto " id="modalTitleId">
                Postear blog
              </h5>

            </div>
            <div class="modal-body">
              <label for="title" class="my-2">Titulo</label>
              <input type="text" class="form-control" v-model="title" id="title">
              <label for="blog" class="my-2">Blog</label>
              <textarea name="blog" id="blog" cols="30" rows="5" class="mt-3 form-control" v-model="blog"></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button v-if="tipoAction == 'create'" type="button" data-bs-dismiss="modal" class="btn btn-primary"
                @click="saveBlog">Publicar</button>
              <button v-if="tipoAction == 'update'" type="button" data-bs-dismiss="modal" class="btn btn-primary"
                @click="updateBlog">Actualizar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script setup>
import { getUser } from '@/helpers/utilities';
import { ref, onMounted } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router'
import router from '@/router';

const blog = ref('')
const title = ref('')
const token = localStorage.getItem('token')
const user = ref({})
const date = new Date()
const updateAction = () => {
  tipoAction.value = 'create'
  console.log(tipoAction.value);
}
const saveBlog = async () => {
  const data = {
    titulo: title.value,
    comment: blog.value,
    create_at: date,
    user_id: user.value.id
  }
  const headers = {
    'authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  }
  if (!controlWords()) {
    try {
      await axios.post('http://localhost:3000/blogs/', data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      blog.value = ''
      title.value =''
      router.push('/')
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal!"
      });
    }

  } else {
    Swal.fire("Comentario no permitido");
  }
}

onMounted(async () => {
  user.value = await getUser();
  getBlogs()
})

const deleteBlog = async (id) => {
  try {
    await axios.delete('http://localhost:3000/blogs/' + id)
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Blog eliminado !!!",
      showConfirmButton: false,
      timer: 1500
    });
    getBlogs()
  } catch (error) {
    console.log('error');
  }
}
const tipoAction = ref('')
const myBlogs = ref([])
const getBlogs = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/blogs/' + user.value.id);
    myBlogs.value = data.results;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salio mal!"
    });
  }
}

const badWords = ref['burro', 'mula', 'asno', 'sonso']
const controlWords = () => {
  let words = blog.value.split(' ')
  for (let i = 0; i < words.length; i++) {
    if (words[i] == 'burro' || words[i] == 'mula' || words[i] == 'sonso') {
      return true;
    }
  }
  return false
}
const idBlog = ref('')
const editBlog = (blog) => {
  tipoAction.value = 'update'
  blog.value = blog.comment
  title.value = blog.titulo
  idBlog.value = blog.id
}

const updateBlog = async () => {
  const data = {
    comment: blog.value,
    update_at: date,
    titulo: title.value,
    id: idBlog.value,
  }
  try {
    await axios.put('http://localhost:3000/blogs/',data);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Blog editado !!!",
      showConfirmButton: false,
      timer: 1500
    });
    blog.value = ''
    title.value =''
    getBlogs()
  } catch (error) {

  }
}

</script>

<style scoped>
li {
  list-style: none;
}
</style>
