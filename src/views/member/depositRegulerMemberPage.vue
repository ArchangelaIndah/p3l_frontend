<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>AKTIVASI MEMBER</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <label type="text" class="form-control">
                                    {{ member.nama_member }}
                                </label>

                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Total Deposit</label>
                                <input class="form-control" type="text" v-model="deposit.depositAwal"
                                    placeholder="Masukkan Uang">
                                <!-- validation -->
                                <div v-if="validation.deposit_awal" class="mt-2 alert alert-danger">
                                    {{ validation.deposit_awal[0] }}
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

import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
export default {

    setup() {
        //state member
        const member = reactive({
            nama_member: '',
            alamat: '',
            tanggal_lahir: '',
            no_telepon: '',
            email: '',
            masa_berlaku: '',
            deposit_uang: '',
            status: ''
        })

        const deposit = reactive({
            depositAwal: 0,
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        const route = useRoute()
        const idPegawai = localStorage.getItem('idPegawai')



        onMounted(() => {
            //get API from Laravel Backend
            axios.get("https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/member/" + route.params.id)
                .then(response => {
                    member.nama_member = response.data.data.nama
                }).catch(error => {
                    console.log(error.response.data)
                })

        })


        function update() {

            axios.post("https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/depositreguler/" + route.params.id, {
                id_pegawai: idPegawai,
                deposit_awal: deposit.depositAwal,
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'transaksiMember'
                })

            }).catch(error => {

                validation.value = error.response.data.message
                console.log(error.response)
            })
        }

        //return
        return {
            member,
            validation,
            router,
            update,
            deposit
        }
    }
}

</script>

<style>
.toast-success {
    background-color: green;
}
</style>
    