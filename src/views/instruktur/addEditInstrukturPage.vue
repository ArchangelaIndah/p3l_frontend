<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH INSTRUKTUR</h4>
                        <hr>
                        <form @submit.prevent="editOrAddCheck">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <input type="text" class="form-control" v-model="instruktur.nama_instruktur"
                                    placeholder="Masukkan nama instruktur">
                                <!-- validation -->
                                <div v-if="validation.nama_instruktur" class="mt-2 alert alert-danger">
                                    {{ validation.nama_instruktur[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Alamat</label>
                                <input class="form-control" type="text" v-model="instruktur.alamat"
                                    placeholder="Masukkan alamat">
                                <!-- validation -->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input class="form-control" type="date" v-model="instruktur.tanggal_lahir"
                                    placeholder="Masukkan tanggal lahir">
                                <!-- validation -->

                                <div v-if="validation.tanggal_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tanggal_lahir[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">No Telepon</label>
                                <input class="form-control" type="text" v-model="instruktur.no_telepon"
                                    placeholder="Masukkan no telepon">
                                <!-- validation -->
                                <div v-if="validation.no_telepon" class="mt-2 alert alert-danger">
                                    {{ validation.no_telepon[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email</label>
                                <input class="form-control" type="text" v-model="instruktur.email"
                                    placeholder="Masukkan email">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">

                                <label for="content" class="form-label">Status</label>
                                <select class="form-control" v-model="instruktur.status">
                                    <option value=1>Aktif</option>
                                    <option value=0>Tidak Aktif</option>
                                </select>

                                <!-- validation -->
                                <div v-if="validation.status" class="mt-2 alert alert-danger">
                                    {{ validation.status[0] }}
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { onMounted } from 'vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
        //state instruktur
        const instruktur = reactive({
            nama_instruktur: '',
            alamat: '',
            tanggal_lahir: '',
            no_telepon: '',
            email: '',
            status: 1
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        const id = localStorage.getItem("idInstruktur")
        onMounted(() => {
            if (id != '0') {
                getById(id)
            }

        })

        function editOrAddCheck() {
            const id = localStorage.getItem("idInstruktur")
            if (id == '0') {
                store()
            } else {
                edit()
                localStorage.setItem("idInstruktur", '0')
            }
        }

        function getById(id) {
            //get API from Laravel Backend
            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/instruktur/' + id).then(response => {
                //assign state posts with response data
                instruktur.nama_instruktur = response.data.data.nama_instruktur
                instruktur.alamat = response.data.data.alamat
                instruktur.tanggal_lahir = response.data.data.tanggal_lahir
                instruktur.no_telepon = response.data.data.no_telepon
                instruktur.email = response.data.data.email
                instruktur.status = response.data.data.status
            }).catch(error => {
                console.log(error.response.data)
            })
        }


        //method store
        function store() {
            let nama_instruktur = instruktur.nama_instruktur
            let alamat = instruktur.alamat
            const date = new Date(instruktur.tanggal_lahir);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            let tanggal_lahir = `${year}-${month}-${day}`;
            //format to 
            console.log(tanggal_lahir)
            let no_telepon = instruktur.no_telepon
            let email = instruktur.email
            let status = instruktur.status

            axios.post('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/instruktur', {
                nama_instruktur: nama_instruktur,
                alamat: alamat,
                tanggal_lahir: tanggal_lahir,
                no_telepon: no_telepon,
                email: email,
                status: status
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'indexInstruktur'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data.message
            })
        }

        function edit() {
            let nama_instruktur = instruktur.nama_instruktur
            let alamat = instruktur.alamat
            const date = new Date(instruktur.tanggal_lahir);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            let tanggal_lahir = `${year}-${month}-${day}`;
            //format to 
            console.log(tanggal_lahir)
            let no_telepon = instruktur.no_telepon
            let email = instruktur.email
            let status = instruktur.status

            axios.put('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/instruktur/' + id, {
                nama_instruktur: nama_instruktur,
                alamat: alamat,
                tanggal_lahir: tanggal_lahir,
                no_telepon: no_telepon,
                email: email,
                status: status
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'indexInstruktur'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data.message
            })
        }

        //return
        return {
            instruktur,
            validation,
            router,
            store,
            editOrAddCheck,
            edit
        }
    }
}

</script>
<style></style>
    