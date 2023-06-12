<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DEPOSIT KELAS MEMBER</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <label type="text" class="form-control">
                                    {{ member.nama_member }}
                                </label>

                                <div v-if="validation.status" class="mt-2 alert alert-danger">
                                    {{ validation.status }}
                                </div>

                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Kelas</label>
                                <select class="form-control" v-model="deposit.idKelas">
                                    <option value="" selected>Pilih Kelas</option>
                                    <option :value="bk.id" v-for="bk in bookingkelas" :key="bk.id">
                                        {{
                                            bk.nama_kelas }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.id_kelas[0] }}
                                </div>
                            </div>


                            <div class="form-group mb-3">
                                <label class="form-label">Jenis Deposit</label>
                                <select @change="onChange" class="form-control" v-model="deposit.jenisDeposit">
                                    <option value="1">5 sesi bonus 1 - 1 Bulan berlaku</option>
                                    <option value="2">10 sesi bonus 3 - 2 Bulan berlaku</option>
                                </select>
                                <!-- validation -->

                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Total Pembayaran : {{ deposit.hargaBayar }}</label>
                                <input class="form-control" type="text" v-model="deposit.totalBayar"
                                    placeholder="Masukkan Uang">
                                <!-- validation -->
                                <div v-if="validation.total_bayar" class="mt-2 alert alert-danger">
                                    {{ validation.total_bayar[0] }}
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
            jenisDeposit: '1',
            totalBayar: '',
            hargaBayar: 750000,
            idKelas: ''
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        const route = useRoute()
        const idPegawai = localStorage.getItem('idPegawai')
        const bookingkelas = ref([])



        onMounted(() => {
            //get API from Laravel Backend
            axios.get("https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/member/" + route.params.id)
                .then(response => {
                    member.nama_member = response.data.data.nama
                }).catch(error => {
                    console.log(error.response.data)
                })

            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/bookingkelas').then(response => {

                bookingkelas.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

        })


        function update() {

            axios.post("https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/depositkelas/" + route.params.id, {
                id_pegawai: idPegawai,
                jenis_deposit: deposit.jenisDeposit,
                id_kelas: deposit.idKelas,
                total_bayar: deposit.totalBayar
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

        function onChange() {
            console.log(deposit.jenisDeposit)
            if (deposit.jenisDeposit == 1) {
                deposit.hargaBayar = 750000
            } else if (deposit.jenisDeposit == 2) {
                deposit.hargaBayar = 1500000
            }
        }

        //return
        return {
            member,
            validation,
            router,
            update,
            deposit,
            onChange,
            bookingkelas
        }
    }
}

</script>

<style>
.toast-success {
    background-color: green;
}
</style>