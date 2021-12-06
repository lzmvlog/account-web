import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home')
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('../components/Index')
    },
    {
        path: '/sub',
        name: 'Subjects',
        component: () => import('../views/Subjects')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
