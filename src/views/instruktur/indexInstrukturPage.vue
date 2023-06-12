<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">INSTRUKTUR</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="form-group mb-3 d-flex justify-content-between gap-3">
                            <input type="text" class="form-control" v-model="searchValue" placeholder="Cari Instruktur">
                            <router-link :to="{ name: 'addEditInstruktur' }"
                                class="btn btn-md btn-success  "><font-awesome-icon :icon="['fas', 'plus']" /></router-link>
                        </div>
                        <EasyDataTable :headers="headers" :items="instrukturs" :search-value="searchValue"
                            :loading="loading">

                            <template #item-status="{ status }">
                                {{ status == 1 ? 'Aktif' : 'Tidak Aktif' }}
                            </template>

                            <template #item-aksi="{ id }">
                                <div class="d-flex justify-content-start gap-2">
                                    <button @click="editItem(id)" class="btn btn-sm btn-primary mr-1">
                                        <font-awesome-icon :icon="['fas', 'pen-to-square']" /></button>
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
            { text: "NAMA INSTRUKTUR", value: "nama_instruktur", sortable: true },
            { text: "ALAMAT", value: "alamat", sortable: true },
            { text: "TANGGAL LAHIR", value: "tanggal_lahir", sortable: true },
            { text: "NO TELEPON", value: "no_telepon", sortable: true },
            { text: "STATUS", value: "status", sortable: true },
            { text: "AKSI", value: "aksi" },
        ]);
        const instrukturs = ref([]);
        const searchValue = ref("");
        const loading = ref(false);

        const router = useRouter()

        onMounted(() => {
            loading.value = true
            localStorage.setItem('idInstruktur', '0')
            //get API from Laravel Backend
            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/instruktur').then(response => {
                //assign state posts with response data
                instrukturs.value = response.data.data
                loading.value = false
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function deleteItem(id) {
            //delete data post by ID
            axios.delete(`https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/instruktur/` + id)
                .then(response => {
                    console.log(response.data)
                    axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/instruktur').then(response => {
                        //assign state posts with response data
                        instrukturs.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                }).catch(error => {
                    console.log(error.response.data)
                })

        }

        function editItem(id) {
            localStorage.setItem('idInstruktur', id)
            router.push('/addEditInstruktur')
        }

        return {
            headers,
            instrukturs,
            searchValue,
            editItem,
            deleteItem,
            loading
        };
    }




}

</script>