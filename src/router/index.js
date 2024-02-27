import {createRouter, createWebHistory} from 'vue-router'

import MainContent from "@/views/MainContent.vue";
import Field from "@/views/Field.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', component: MainContent},
        {path: '/game', component: Field},
    ]
})


export default router
