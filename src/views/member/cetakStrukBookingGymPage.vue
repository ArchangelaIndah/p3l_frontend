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
                        <div>
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
                                    <strong>
                                        STRUK PRESENSI GYM
                                    </strong>
                                </p>
                                <p>
                                    No Struk : {{ idStruk }}
                                </p>
                                <p>
                                    Tanggal : {{ tanggalPresensi }}
                                </p>
                            </div>

                        </div>
                        <div>
                            <p>
                                <b>Member : </b>{{ idMember + ' / ' + namaMember }}
                            </p>
                            <p>
                                Slot Waktu : {{ sesi }}
                            </p>


                        </div>

                        <button @click="cetakStruk()" class="cetak reguler btn btn-sm btn-danger ml1"><font-awesome-icon
                                :icon="['fas', 'id-card']" /> Cetak
                            Struk</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { useRoute } from 'vue-router'
export default {

    setup() {

        const route = useRoute();
        const idStruk = route.params.id
        const tanggalPresensi = route.params.tanggalPresensi
        const idMember = route.params.idMember
        const namaMember = route.params.namaMember
        const sesi = route.params.sesi


        function cetakStruk() {
            window.print()
        }


        return {
            cetakStruk,
            idStruk,
            tanggalPresensi,
            idMember,
            namaMember,
            sesi
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