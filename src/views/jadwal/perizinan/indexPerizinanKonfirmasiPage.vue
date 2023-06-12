<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">MEMBER</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="form-group mb-3 d-flex justify-content-between gap-3">
                            <input type="text" class="form-control" v-model="searchValue" placeholder="Cari Instruktur">
                        </div>
                        <EasyDataTable :headers="headers" :items="perizinan" :search-value="searchValue" :loading="loading">

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
            { text: "ID INSTRUKTUR", value: "f_instruktur.id", sortable: true },
            { text: "NAMA INSTRUKTUR", value: "f_instruktur.nama_instruktur", sortable: true },
            { text: "NAMA INSTRUKTUR PENGGANTI", value: "f_instruktur_pengganti.nama_instruktur", sortable: true },
            { text: "KELAS", value: "f_jadwal_harian.f_jadwal_umum.f_booking_kelas.nama_kelas", sortable: true },
            { text: "TANGGAL KELAS", value: "f_jadwal_harian.tanggal_jadwal_harian", sortable: true },
            { text: "SESI", value: "f_jadwal_harian.jam_kelas", sortable: true },
            { text: "STATUS", value: "status" },
        ]);

        const perizinan = ref([])
        const router = useRouter()
        const searchValue = ref("");
        const loading = ref(false);

        onMounted(() => {
            loading.value = true
            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/historiperizinanall').then(response => {
                loading.value = false
                perizinan.value = response.data.data

            }).catch(error => {
                console.log(error.response)
            })
        })



        return {
            perizinan,
            router,
            searchValue,
            headers,
            loading,

        }

    }


}
</script>
