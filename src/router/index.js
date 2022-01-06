import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/login/Login')
    },
    {
        path: '/home',
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

router.beforeEach(function(to, from, next) {
    if (!localStorage.getItem("token")) {
        if (to.path !== '/') {
            return next('/')
        }
    }
    next()
})

export default router
