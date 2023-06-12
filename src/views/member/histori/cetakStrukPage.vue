<template>
    <div
        class="headerTitle d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">HISTORI MEMBER</h1>
    </div>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body border border-dark">
                        <div class="d-flex justify-content-between">
                            <div>
                                <p>
                                    <b>GoFit</b>
                                </p>
                                <p>
                                    Jl.Centralpark No.10 Yogyakarta
                                </p>
                            </div>

                            <div>
                                <p>
                                    No Struk : {{ histori.id }}
                                </p>
                                <p>
                                    Tanggal : {{ histori.tanggal_transaksi }}
                                </p>
                            </div>

                        </div>
                        <div>
                            <p>
                                <b>Member : {{ f_member.id + ' / ' + f_member.nama }}</b>
                            </p>
                            <div v-if="strukKode == 1">
                                <p>
                                    Aktivasi Tahunan : {{ histori.total }}
                                </p>
                                <p>
                                    Masa Aktif Member : {{ f_member.masa_berlaku }}
                                </p>
                            </div>

                            <div v-else-if="strukKode == 2">
                                <p>
                                    Deposit {{ histori.total_deposit == 6 ? '(Bayar 5 Gratis 1)' : 'Bayar 10 Gratis 3' }} :
                                    Rp.{{ histori.total_transaksi }}
                                </p>
                                <p>
                                    Jenis Kelas : {{ f_kelas.nama_kelas }}
                                </p>
                                <p>
                                    Total Deposit {{ f_kelas.nama_kelas }} : {{ histori.total_deposit }}
                                </p>
                                <p>
                                    Berlaku Sampai Dengan : {{ histori.masa_berlaku }}
                                </p>
                            </div>

                            <div v-else>
                                <p>
                                    Deposit : {{ histori.deposit_awal }}
                                </p>
                                <p>
                                    Bonus Deposit : {{ histori.bonus }}
                                </p>
                                <p>
                                    Sisa Deposit : {{ histori.sisa_deposit }}
                                </p>
                                <p>
                                    Total Deposit : {{ histori.total_deposit }}
                                </p>
                            </div>


                        </div>
                        <div class="d-flex flex-row-reverse">
                            <p>
                                Kasir : {{ f_pegawai.id + ' / ' + f_pegawai.nama_pegawai }}
                            </p>
                        </div>
                        <button @click="cetakStruk(id)" class="cetak reguler btn btn-sm btn-danger ml1"><font-awesome-icon
                                :icon="['fas', 'id-card']" /> Cetak
                            Struk</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>





<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {

    setup() {


        const histori = ref([])
        const f_member = ref([])
        const f_pegawai = ref([])
        const f_kelas = ref([])
        const router = useRouter()
        const searchValue = ref("");
        const loading = ref(false);
        const route = useRoute();
        const strukKode = route.params.strukKode
        // const idPegawai = localStorage.getItem('idPegawai')

        onMounted(() => {
            loading.value = true
            if (strukKode == 1) {
                axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/historiAktivasi/' + route.params.id).then(response => {
                    loading.value = false
                    histori.value = response.data.data
                    f_pegawai.value = histori.value.f_pegawai
                    f_member.value = histori.value.f_member

                }).catch(error => {
                    console.log(error.response.data)
                })
            } else if (strukKode == 2) {
                axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/historiDepositKelas/' + route.params.id).then(response => {
                    loading.value = false
                    histori.value = response.data.data
                    f_pegawai.value = histori.value.f_pegawai
                    f_member.value = histori.value.f_member
                    f_kelas.value = histori.value.f_kelas

                }).catch(error => {
                    console.log(error.response.data)
                })
            } else {
                axios.get('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/historiDepositReguler/' + route.params.id).then(response => {
                    loading.value = false
                    histori.value = response.data.data
                    f_pegawai.value = histori.value.f_pegawai
                    f_member.value = histori.value.f_member

                }).catch(error => {
                    console.log(error.response.data)
                })
            }
        })

        function cetakStruk() {
            window.print()
        }


        return {
            histori,
            router,
            searchValue,
            loading,
            cetakStruk,
            strukKode,
            f_pegawai,
            f_member,
            f_kelas

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

@media print {

    .parentDashboardMember {
        visibility: hidden;
    }

    .cetak {
        visibility: hidden;
    }

    .headerTitle {
        visibility: hidden;
    }
}
</style>
