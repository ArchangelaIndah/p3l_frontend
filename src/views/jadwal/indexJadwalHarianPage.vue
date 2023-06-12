<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">JADWAL HARIAN</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="form-group mb-3 d-flex justify-content-between gap-3">
                            <input type="text" class="form-control" v-model="searchValue" placeholder="Cari Instruktur">
                            <button class="btn btn-primary" @click="generateJadwalHarian">Generate Jadwal Harian</button>

                        </div>
                        <EasyDataTable :headers="headers" :items="jadwalHarian" :search-value="searchValue"
                            :loading="loading">



                        </EasyDataTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>





<script>
import axios from 'axios'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
    components: {
        EasyDataTable: Vue3EasyDataTable
    },

    setup() {
        const headers = ref([
            { text: "NAMA INSTRUKTUR", value: "f_jadwal_umum.f_instruktur.nama_instruktur", sortable: true },
            { text: "NAMA KELAS", value: "f_jadwal_umum.nama_kelas", sortable: true },
            { text: "TANGGAL KELAS", value: "tanggal_jadwal_harian", sortable: true },
            { text: "SESI KELAS", value: "jam_kelas", sortable: true },
        ]);

        const jadwalHarian = ref([
        ])
        const router = useRouter()
        const searchValue = ref("");
        const loading = ref(false);

        onMounted(() => {
            loading.value = true
            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/jadwalharian').then(response => {
                loading.value = false
                jadwalHarian.value = response.data.data
            }).catch(error => {
                loading.value = false
                console.log(error.response.data)
            })
        })

        function generateJadwalHarian() {
            loading.value = true
            axios.post('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/jadwalharian').then(response => {
                loading.value = false
                console.log(response.data.data)
            }).catch(error => {
                loading.value = false
                console.log(error.response.data)
                alert(error.response.data.message)
            })
        }

        return {
            jadwalHarian,
            generateJadwalHarian,
            router,
            searchValue,
            headers,
            loading

        }

    }


}
</script>
