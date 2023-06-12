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

      <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/1.jpg" style="height: 625px;" class="d-block w-100" alt="1">
            <div class="carousel-caption d-none d-md-block" style="background-color: rgba(0,0,0,50%);">
              <h4 class="display-5">WELCOME</h4>
            </div>
          </div>
          <div class="carousel-item">
            <img src="../assets/2.jpg" style="height: 625px;" class="d-block w-100" alt="2">
            <div class="carousel-caption d-none d-md-block" style="background-color: rgba(0,0,0,50%);">
            </div>
          </div>
          <div class="carousel-item">
            <img src="../assets/3.jpg" style="height: 625px;" class="d-block w-100" alt="3">
            <div class="carousel-caption d-none d-md-block " style="background-color: rgba(0,0,0,50%);">
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
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
        return {
            user,
            validation,
            router,
            store
        }


    }
}


</script>
