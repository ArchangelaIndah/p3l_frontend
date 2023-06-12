<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT KELAS</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Kelas</label>
                                <input type="text" class="form-control" v-model="kelas.nama_kelas"
                                    placeholder="Masukkan nama kelas">
                                <!-- validation -->
                                <div v-if="validation.nama_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.nama_kelas[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama instruktur</label>
                                <select class="form-control" v-model="kelas.instruktur_id">

                                    <option :value="instruktur.id" v-for="instruktur in instrukturs" :key="instruktur.id">
                                        {{
                                            instruktur.nama_instruktur }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.instruktur_id" class="mt-2 alert alert-danger">
                                    {{ validation.instruktur_id[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Kelas</label>
                                <input @change="onDateInputChange" class="form-control" type="date"
                                    v-model="kelas.tanggal_kelas" placeholder="Masukkan tanggal kelas">
                                <!-- validation -->

                                <div v-if="validation.tanggal_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.tanggal_kelas[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Hari kelas</label>
                                <input disabled class="form-control" type="text" v-model="kelas.hari_kelas"
                                    placeholder="Masukkan hari kelas">
                                <!-- validation -->
                                <div v-if="validation.hari_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.hari_kelas[0] }}
                                </div>
                            </div>


                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Sesi Kelas</label>
                                <input class="form-control" type="text" v-model="kelas.sesi_kelas"
                                    placeholder="Masukkan sesi kelas">
                                <!-- validation -->
                                <div v-if="validation.sesi_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.sesi_kelas[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Kelas</label>
                                <select class="form-control" v-model="kelas.booking_kelas_id">

                                    <option :value="bk.id" v-for="bk in bookingkelas" :key="bk.id">
                                        {{
                                            bk.nama_kelas }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_booking_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.id_booking_kelas[0] }}
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
        //state kelas
        const kelas = reactive({
            nama_kelas: '',
            instruktur_id: '',
            tanggal_kelas: '',
            hari_kelas: '',
            sesi_kelas: '',
            booking_kelas_id: ''
        })
        //state validation
        const validation = ref([])
        let instrukturs = ref([])
        let bookingkelas = ref([])
        //vue router
        const router = useRouter()
        const route = useRoute()

        onMounted(() => {

            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/instruktur').then(response => {

                instrukturs.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/bookingkelas').then(response => {

                bookingkelas.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })


            //get API from Laravel Backend
            axios.get("https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/jadwal/" + route.params.id)
                .then(response => {
                    kelas.nama_kelas = response.data.data.nama_kelas
                    kelas.instruktur_id = response.data.data.id_instruktur
                    kelas.tanggal_kelas = response.data.data.tanggal_kelas
                    kelas.hari_kelas = response.data.data.hari_kelas
                    kelas.sesi_kelas = response.data.data.sesi_kelas
                    kelas.booking_kelas_id = response.data.data.id_booking_kelas
                }).catch(error => {
                    console.log(error.response.data)
                })

        })



        function update() {
            let nama_kelas = kelas.nama_kelas
            let instruktur_id = kelas.instruktur_id
            let tanggal_kelas = convertDate(kelas.tanggal_kelas);
            let hari_kelas = kelas.hari_kelas
            let sesi_kelas = kelas.sesi_kelas
            let booking_kelas_id = kelas.booking_kelas_id


            axios.put('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/jadwal/' + route.params.id, {
                nama_kelas: nama_kelas,
                id_instruktur: instruktur_id,
                tanggal_kelas: tanggal_kelas,
                hari_kelas: hari_kelas,
                sesi_kelas: sesi_kelas,
                id_booking_kelas: booking_kelas_id
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'indexJadwal'
                })
                // toastr.success("kelas Berhasil Ditambahkan")
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data.message
            })
        }

        function convertDate(dateNow) {
            const date = new Date(dateNow);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`
        }

        function onDateInputChange(e) {
            const date = new Date(e.target.value);
            kelas.hari_kelas = date.toLocaleDateString('id-ID', { weekday: 'long' });
        }


        //return
        return {
            kelas,
            validation,
            router,
            update,
            instrukturs,
            bookingkelas,
            onDateInputChange
        }
    }
}

</script>

<style></style>
    