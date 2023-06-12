<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Jadwal</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="form-group mb-3 d-flex justify-content-between gap-3">
                            <input type="text" class="form-control" v-model="searchValue" placeholder="Cari Jadwal">
                            <router-link :to="{ name: 'addJadwal' }" class="btn btn-md btn-success  "><font-awesome-icon :icon="['fas', 'plus']" /></router-link>
                        </div>

                        <EasyDataTable :headers="headers" :items="jadwals" :search-value="searchValue" :loading="loading">
                            <template #item-aksi="{ id }">
                                <div class="d-flex justify-content-start gap-2">
                                    <router-link :to="{ name: 'editJadwal', params: { id: id } }"
                                        class="btn btn-sm btn-primary mr-1"> <font-awesome-icon
                                            :icon="['fas', 'pen-to-square']" /></router-link>
                                    <button @click="deleteItem(id)" class="btn btn-sm btn-danger ml1"><font-awesome-icon
                                            :icon="['fas', 'trash']" /></button>
                                </div>
                            </template>
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
            { text: "NAMA KELAS", value: "nama_kelas", sortable: true },
            { text: "NAMA INSTRUKTUR", value: "f_instruktur.nama_instruktur", sortable: true },
            { text: "JENIS KELAS", value: "f_booking_kelas.nama_kelas", sortable: true },
            { text: "TANGGAL KELAS", value: "tanggal_kelas", sortable: true },
            { text: "HARI", value: "hari_kelas", sortable: true },
            { text: "SESI", value: "sesi_kelas", sortable: true },
            { text: "AKSI", value: "aksi" },
        ]);

        const jadwals = ref([])
        const router = useRouter()
        const searchValue = ref("");
        const loading = ref(false);

        function deleteItem(id) {
            //delete data post by ID
            axios.delete(`https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/jadwal/` + id)
                .then(response => {
                    console.log(response.data)
                    axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/jadwal').then(response => {
                        //assign state posts with response data
                        jadwals.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                }).catch(error => {
                    console.log(error.response.data)
                })

        }

        onMounted(() => {
            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/jadwal').then(response => {
                //assign state posts with response data
                jadwals.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })
        //return
        return {
            jadwals,
            deleteItem,
            router,
            searchValue,
            headers,
            loading
        }
    }
}
</script>

<style></style>
