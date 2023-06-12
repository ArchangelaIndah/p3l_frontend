<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">PRESENSI GYM</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="form-group mb-3 d-flex justify-content-between gap-3">
                            <input type="text" class="form-control" v-model="searchValue" placeholder="Cari Presensi Gym">
                        </div>
                        <EasyDataTable :headers="headers" :items="presensiGym" :search-value="searchValue"
                            :loading="loading">

                            <template #item-waktu_presensi="{ waktu_presensi }">
                                {{ waktu_presensi == null ? '-' : waktu_presensi }}
                            </template>

                            <template #item-aksi="item">
                                <button v-if="item.waktu_presensi == null" @click="updatePresensiGym(item.id)"
                                    class="activation btn btn-sm btn-primary "><font-awesome-icon :icon="['fas', 'user']" />
                                    Presensi Member</button>

                                <button v-else @click="cetakStruk(item)"
                                    class="reguler btn btn-sm btn-danger ml1"><font-awesome-icon
                                        :icon="['fas', 'id-card']" /> Cetak Struk</button>


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
            { text: "NO STRUK", value: "id", sortable: true },
            { text: "ID MEMBER", value: "id_member", sortable: true },
            { text: "NAMA MEMBER", value: "f_presensi_gym.nama", sortable: true },
            { text: "TANGGAL BOOKING", value: "tanggal_booking", sortable: true },
            { text: "WAKTU PRESENSI", value: "waktu_presensi", sortable: true },
            { text: "SESI", value: "sesi", sortable: true },
            { text: "AKSI", value: "aksi" },
        ]);

        const presensiGym = ref([])
        const router = useRouter()
        const searchValue = ref("");
        const loading = ref(false);

        onMounted(() => {
            showAll()
        })

        function showAll() {
            loading.value = true
            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/showallbookinggym').then(response => {
                loading.value = false
                presensiGym.value = response.data.data

            }).catch(error => {
                console.log(error.response)
            })
        }

        function updatePresensiGym(id) {
            axios.put('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/updatepresensigym/' + id).then(response => {
                console.log(response.data)
                // call onMounted
                showAll()


            }).catch(error => {
                console.log(error.response)
            })
        }

        function cetakStruk(item) {
            router.push({
                name: 'cetakStrukBookingGym',
                params: {
                    id: item.id,
                    tanggalPresensi: item.waktu_presensi,
                    idMember: item.id_member,
                    namaMember: item.f_presensi_gym.nama,
                    sesi: item.sesi,
                }
            })
        }




        return {
            updatePresensiGym,
            presensiGym,
            router,
            searchValue,
            headers,
            loading,
            cetakStruk

        }

    }


}
</script>
