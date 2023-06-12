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
                            <input type="text" class="form-control" v-model="searchValue" placeholder="Cari Member">
                            <router-link :to="{ name: 'addMember' }" class="btn btn-md btn-success  "><font-awesome-icon
                                    :icon="['fas', 'plus']" /></router-link>
                        </div>
                        <EasyDataTable :headers="headers" :items="members" :search-value="searchValue" :loading="loading">

                            <template #item-status="{ status }">
                                {{ status == 1 ? 'Aktif' : 'Tidak Aktif' }}
                            </template>

                            <template #item-aksi="{ id }">
                                <div class="d-flex justify-content-start gap-2">
                                    <router-link :to="{ name: 'editMember', params: { id: id } }"
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
            { text: "NAMA MEMBER", value: "nama", sortable: true },
            { text: "ALAMAT", value: "alamat", sortable: true },
            { text: "TANGGAL LAHIR", value: "tanggal_lahir", sortable: true },
            { text: "NO TELEPON", value: "no_telepon", sortable: true },
            { text: "EMAIL", value: "email", sortable: true },
            { text: "MASA BERLAKU", value: "masa_berlaku", sortable: true },
            { text: "DEPOSIT UANG", value: "deposit_uang", sortable: true },
            { text: "DEPOSIT KELAS", value: "deposit_kelas", sortable: true },
            { text: "STATUS", value: "status" },
            { text: "AKSI", value: "aksi" },
        ]);

        const members = ref([])
        const router = useRouter()
        const searchValue = ref("");
        const loading = ref(false);

        onMounted(() => {
            loading.value = true
            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/member').then(response => {
                loading.value = false
                members.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function deleteItem(id) {

            axios.delete(`https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/member/` + id)
                .then(response => {
                    console.log(response.data)
                    axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/member').then(response => {

                        members.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                }).catch(error => {
                    console.log(error.response.data)
                })

        }

        return {
            members,
            deleteItem,
            router,
            searchValue,
            headers,
            loading

        }

    }


}
</script>
