import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomePage.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/LoginPage.vue')
    },
    {
        path: '/aboutus',
        name: 'Aboutus',
        component: () => import(/* webpackChunkName: "aboutus" */ '@/views/AboutUs.vue')
    },
    {
        path: '/dashboardInstruktur',
        name: 'instruktur',
        component: () => import(/* webpackChunkName: "home" */ '@/components/InstrukturDashboard.vue'),
        children: [
            {
                path: '/indexInstruktur',
                name: 'indexInstruktur',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/instruktur/indexInstrukturPage.vue')
            },
            {
                path: '/addEditInstruktur',
                name: 'addEditInstruktur',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/instruktur/addEditInstrukturPage.vue')
            },

        ]

    },
    {
        path: '/dashboardMember',
        name: 'member',
        component: () => import(/* webpackChunkName: "home" */ '@/components/MemberDashboard.vue'),
        children: [
            {
                path: '/indexMember',
                name: 'indexMember',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/indexMemberPage.vue')
            },
            {
                path: '/addMember',
                name: 'addMember',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/addMemberPage.vue')
            },  
            {
                path: '/editMember',
                name: 'editMember',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/editMemberPage.vue')
            },
            {
                path: '/transaksiMember',
                name: 'transaksiMember',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/transaksiMemberPage.vue')

            },
            {
                path: '/aktivasiMember',
                name: 'aktivasiMember',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/aktivasiMemberPage.vue')

            },
            {
                path: '/depositRegulerMember',
                name: 'depositRegulerMember',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/depositRegulerMemberPage.vue')

            },
            {
                path: '/depositKelasMember',
                name: 'depositKelasMember',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/depositKelasMemberPage.vue')

            },
            {
                path: '/historiAktivasiMember',
                name: 'historiAktivasiMember',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/histori/historiAktivasiMemberPage.vue')

            },
            {
                path: '/cetakStruk',
                name: 'cetakStruk',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/histori/cetakStrukPage.vue')

            } ,
            {
                path: '/historiDepositKelas',
                name: 'historiDepositKelas',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/histori/historiDepositKelasPage.vue')

            },
            {
                path: '/historiDepositReguler',
                name: 'historiDepositReguler',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/histori/historiDepositRegulerPage.vue')

            },
            {
                path: '/presensiBookingGym',
                name: 'presensiBookingGym',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/presensiBookingGymPage.vue')

            },
            {
                path: '/cetakStrukBookingGym',
                name: 'cetakStrukBookingGym',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/member/cetakStrukBookingGymPage.vue')

            },                   
        ]

    },
    {
        path: '/dashboardJadwal',
        name: 'jadwal',
        component: () => import(/* webpackChunkName: "home" */ '@/components/JadwalDashboard.vue'),
        children: [
            {
                path: '/indexJadwal',
                name: 'indexJadwal',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/jadwal/indexJadwalPage.vue')
            },
            {
                path: '/addJadwal',
                name: 'addJadwal',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/jadwal/addJadwalPage.vue')
            },  
            {
                path: '/editJadwal',
                name: 'editJadwal',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/jadwal/editJadwalPage.vue')
            },
            {
                path: '/indexJadwalHarian',
                name: 'indexJadwalHarian',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/jadwal/indexJadwalHarianPage.vue')
            },
            {
                path: '/indexPerizinan',
                name: 'indexPerizinan',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/jadwal/perizinan/indexPerizinanPage.vue')
            },
            {
                path: '/indexPerizinanKonfirmasi',
                name: 'indexPerizinanKonfirmasi',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/jadwal/perizinan/indexPerizinanKonfirmasiPage.vue')
            },
            {
                path: '/changeStatusAccept',
                name: 'changeStatusAccept',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/jadwal/perizinan/changeStatusAcceptPage.vue')
            },               
        ]

    },
]

const router = createRouter({  
    history: createWebHistory(),
    routes
})

export default router;