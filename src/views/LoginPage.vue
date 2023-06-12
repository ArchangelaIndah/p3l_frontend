<template>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand"> <img class="d-inline-block align-text-top" src="../assets/logo.jpg" width="110" height="24" ></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="./home">HOME</a>  
              </li>
              <li class="nav-item">
                <a class="nav-link " aria-current="page" href="./login">LOGIN</a>
              </li>
              <li class="nav-item">
                <a class="nav-link " aria-current="page" href="./aboutus">ABOUT US</a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

    <div class="p-3 mb-2 bg-secondary-subtle text-emphasis-secondary" style="height: 625px;">
        <div class="container mt-5" style="max-width: 540px;">
            <div class="card mb-3 shadow" style="width: 125%;">
                <div class="card-body">

                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input v-model="user.username" type="email" class="form-control" id="username" placeholder="username">
                    <div v-if="validation.nama_pegawai" class="mt-2 alert alert-danger">
                        {{ validation.nama_pegawai[0] }}
                    </div>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">password</label>
                    <input v-model="user.password" type="password" class="form-control" id="password" placeholder="password">
                    <div v-if="validation.password" class="mt-2 alert alert-danger">
                        {{ validation.password[0] }}
                    </div>
                </div>

                <button v-if="user.loading == false" @click="store()" type="button" class="btn btn-success">Login</button>
                <div v-if="user.loading" class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>


            </div>
        </div>
    </div>

</div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {

    setup() {

        const user = reactive({
            username: '',
            password: '',
            loading: false
        })
        //state validation
        let validation = ref([])
        //vue router
        const router = useRouter()
        //method store
        function store() {
            user.loading = true
            let username = user.username
            let password = user.password
            axios.post('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/loginPegawai', {
                nama_pegawai: username,
                password: password,
            }).then(response => {
                const role = response.data.user.role
                const id = response.data.user.id
                localStorage.setItem('idPegawai', id)
                if (role === 'admin') {
                    router.push('/indexInstruktur')
                } else if (role === 'kasir') {
                    router.push('/indexMember')
                } else {
                    router.push('/indexJadwal')
                }


            }).catch(error => {

                //know response code
                if (error.response.status == 401) {
                    alert('username atau password salah')
                } else if (error.response.status == 400) {
                    validation.value = error.response.data.message

                }
                //assign state validation with error 


                user.loading = false
            })
        }
        //return
        return {
            user,
            validation,
            router,
            store
        }


    }
}


</script>
