<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">HISTORI DEPOSIT REGULER</h1>
    </div>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">

                        <div class="form-group mb-3 d-flex justify-content-between gap-3">
                            <input type="text" class="form-control" v-model="searchValue" placeholder="Cari Member">
                        </div>
                        <EasyDataTable :headers="headers" :items="histori" :search-value="searchValue" :loading="loading">


                            <template #item-aksi="{ id }">
                                <div class="d-flex justify-content-start gap-2">

                                    <button @click="cetakStruk(id)"
                                        class="reguler btn btn-sm btn-danger ml1"><font-awesome-icon
                                            :icon="['fas', 'id-card']" /> Cetak Struk</button>


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
            { text: "NAMA MEMBER", value: "f_member.nama", sortable: true },
            { text: "NAMA PEGAWAI", value: "f_pegawai.nama_pegawai", sortable: true },
            { text: "TANGGAL TRANSAKSI", value: "tanggal_transaksi", sortable: true },

            { text: "DEPOSIT AWAL", value: "sisa_deposit", sortable: true },
            { text: "JUMLAH DEPOSIT", value: "deposit_awal", sortable: true },
            { text: "BONUS DEPOSIT", value: "bonus", sortable: true },
            { text: "TOTAL DEPOSIT", value: "total_deposit", sortable: true },
            { text: "AKSI", value: "aksi" },
        ]);

        const histori = ref([])
        const router = useRouter()
        const searchValue = ref("");
        const loading = ref(false);
        // const idPegawai = localStorage.getItem('idPegawai')

        onMounted(() => {
            loading.value = true
            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/historiDepositReguler').then(response => {
                loading.value = false
                histori.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function cetakStruk(id) {
            router.push({
                name: 'cetakStruk',
                params: {
                    id: id,
                    strukKode: 3
                }
            })
        }


        return {
            histori,
            router,
            searchValue,
            headers,
            loading,
            cetakStruk

        }

    }


}
</script>

<style >
.reguler {
    background-color: #20c997;
    border-color: #20c997;
}

.reguler:hover {
    background-color: #1a9973;
    border-color: #1a9973;
}
</style>
