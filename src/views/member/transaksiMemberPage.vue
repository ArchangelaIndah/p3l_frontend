<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">MEMBER</h1>
    </div>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">

                        <h4>Keterangan Icon</h4>
                        <div class="mb-4 mt-3 d-flex justify-content-start gap-3">
                            <div>
                                <button class="activation btn btn-sm btn-primary "><font-awesome-icon
                                        :icon="['fas', 'user']" /></button>
                                <label class="ms-1">Aktivasi Member</label>
                            </div>

                            <div>
                                <button class="reguler btn btn-sm btn-danger ml1"><font-awesome-icon
                                        :icon="['fas', 'money-check-dollar']" /></button>
                                <label class="ms-1">Deposit Reguler</label>
                            </div>

                            <div>
                                <button class="kelas btn btn-sm btn-danger ml1"><font-awesome-icon
                                        :icon="['fas', 'dumbbell']" /></button>
                                <label class="ms-1">Deposit Kelas</label>
                            </div>

                        </div>
                        <div class="form-group mb-3 d-flex justify-content-between gap-3">
                            <input type="text" class="form-control" v-model="searchValue" placeholder="Cari Member">
                        </div>
                        <EasyDataTable :headers="headers" :items="members" :search-value="searchValue" :loading="loading">

                            <template #item-status="{ status }">
                                {{ status == 1 ? 'Aktif' : 'Tidak Aktif' }}
                            </template>

                            <template #item-aksi="item">
                                <div class="d-flex justify-content-start gap-2">
                                    <button @click="aktivasiMember(item.id)"
                                        class="activation btn btn-sm btn-primary "><font-awesome-icon
                                            :icon="['fas', 'user']" /></button>
                                    <button :disabled="item.status == 0" @click="depositReguler(item.id)"
                                        class="reguler btn btn-sm btn-danger ml1"><font-awesome-icon
                                            :icon="['fas', 'money-check-dollar']" /></button>

                                    <button :disabled="item.status == 0" @click="depositKelas(item.id)"
                                        class="kelas btn btn-sm btn-danger ml1"><font-awesome-icon
                                            :icon="['fas', 'dumbbell']" /></button>
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
            { text: "NO TELEPON", value: "no_telepon", sortable: true },
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
        // const idPegawai = localStorage.getItem('idPegawai')

        onMounted(() => {
            loading.value = true
            axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/member').then(response => {
                loading.value = false
                members.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function aktivasiMember(id) {
            router.push({
                name: 'aktivasiMember',
                params: { id: id }
            })
        }

        function depositReguler(id) {
            router.push({
                name: 'depositRegulerMember',
                params: { id: id }
            })
        }

        function depositKelas(id) {
            router.push({
                name: 'depositKelasMember',
                params: { id: id }
            })
        }

        return {
            members,
            router,
            searchValue,
            headers,
            loading,
            aktivasiMember,
            depositReguler,
            depositKelas

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

.kelas {
    background-color: #fd7e14;
    border-color: #fd7e14;
}

.kelas:hover {
    background-color: #cc6714;
    border-color: #cc6714;
}

.reguler:disabled {
    background-color: #20c997;
    border-color: #20c997;
}

.kelas:disabled {
    background-color: #fd7e14;
    border-color: #fd7e14;
}
</style>
