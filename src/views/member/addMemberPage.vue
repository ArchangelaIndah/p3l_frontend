<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH MEMBER</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <input type="text" class="form-control" v-model="member.nama_member"
                                    placeholder="Masukkan nama member">
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Alamat</label>
                                <input class="form-control" type="text" v-model="member.alamat"
                                    placeholder="Masukkan alamat">
                                <!-- validation -->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input class="form-control" type="date" v-model="member.tanggal_lahir"
                                    placeholder="Masukkan tanggal lahir">
                                <!-- validation -->

                                <div v-if="validation.tanggal_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tanggal_lahir[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">No Telepon</label>
                                <input class="form-control" type="text" v-model="member.no_telepon"
                                    placeholder="Masukkan no telepon">
                                <!-- validation -->
                                <div v-if="validation.no_telepon" class="mt-2 alert alert-danger">
                                    {{ validation.no_telepon[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email</label>
                                <input class="form-control" type="text" v-model="member.email" placeholder="Masukkan email">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Masa Berlaku</label>
                                <input class="form-control" v-model="member.masa_berlaku"
                                    placeholder="Masukkan masa berlaku" type="date">
                                <!-- validation -->
                                <div v-if="validation.masa_berlaku" class="mt-2 alert alert-danger">
                                    {{ validation.masa_berlaku[0] }}
                                </div>
                            </div>

                            <!-- <div class="form-group mb-3">
                                <label for="content" class="form-label">Deposit Uang</label>
                                <input class="form-control" type="number" v-model="member.deposit_uang"
                                    placeholder="Masukkan deposit uang">
       

                                <div v-if="validation.deposit_uang" class="mt-2 alert alert-danger">
                                    {{ validation.deposit_uang[0] }}
                                </div>
                            </div> -->

                            <!-- <div class="form-group mb-3">
                                <label class="form-label">Status</label>
                                <select class="form-control" v-model="member.status">
                                    <option value="">Pilih Status</option>
                                    <option :value=1>Aktif</option>
                                    <option :value=0>Tidak Aktif</option>
                                </select>
                                
                                <div v-if="validation.status" class="mt-2 alert alert-danger">
                                    {{ validation.status[0] }}
                                </div>
                            </div> -->

                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
        //state member
        const member = reactive({
            nama_member: '',
            alamat: '',
            tanggal_lahir: '',
            no_telepon: '',
            email: '',
            masa_berlaku: '',
            deposit_uang: '',
            status: ''
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()

        function convertDate(dateNow) {
            const date = new Date(dateNow);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`
        }

        //method store
        function store() {
            let nama_member = member.nama_member
            let alamat = member.alamat


            let tanggal_lahir = convertDate(member.tanggal_lahir);
            let no_telepon = member.no_telepon
            let email = member.email
            let masa_berlaku = convertDate(member.masa_berlaku);

            axios.post('https://jollyvm2.eastus.cloudapp.azure.com/git/p3l_dian/public/api/member', {
                nama: nama_member,
                alamat: alamat,
                tanggal_lahir: tanggal_lahir,
                no_telepon: no_telepon,
                email: email,
                masa_berlaku: masa_berlaku,
                deposit_uang: 0,
                status: 0
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'indexMember'
                })
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data.message
                console.log(error.response.data.message)
            })
        }

        //return
        return {
            member,
            validation,
            router,
            store
        }
    }
}

</script>
<style></style>
    