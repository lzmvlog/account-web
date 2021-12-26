import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home')
    },
    {
        path: '/sub',
        name: 'Subjects',
        component: () => import('../views/sub/Subjects')
    },
    {
        path: '/bill',
        name: 'bill',
        component: () => import('../views/bill/Bill')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
