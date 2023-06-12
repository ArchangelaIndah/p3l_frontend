<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>APPROVE PERIZINAN</h4>
                        <hr>
                        <form @submit.prevent="update">


                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama instruktur</label>
                                <select class="form-control" v-model="id_instruktur_pengganti">
                                    <option value="0">Pilih Instruktur</option>
                                    <option :value="instruktur.id" v-for="instruktur in instrukturs" :key="instruktur.id">
                                        {{
                                            instruktur.nama_instruktur }}</option>
                                </select>
                                <!-- validation -->
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

import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
export default {

    setup() {


        const instrukturs = ref([])
        //vue router
        const router = useRouter()
        const route = useRoute()
        const id_instruktur_pengganti = ref(0)



        onMounted(() => {
            //get API from Laravel Backend
            axios.get("https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/showinstrukturavaliable/" + route.params.id)
                .then(response => {
                    instrukturs.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })

        })


        function update() {

            axios.post("https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/updateperizinanaccept/" + route.params.id, {
                id_instruktur_pengganti: id_instruktur_pengganti.value
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'indexPerizinan'
                })

            }).catch(error => {
                console.log(error.response)
            })
        }

        //return
        return {
            router,
            update,
            id_instruktur_pengganti,
            instrukturs
        }
    }
}

</script>

<style>
.toast-success {
    background-color: green;
}
</style>
    