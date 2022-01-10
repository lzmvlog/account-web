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
        component: () => import('../views/Home'),
        children: [
            {
                path: '/sub',
                name: 'Subjects',
                component: () => import('../views/sub/Subjects')
            },
            {
                path: '/bill',
                name: 'bill',
                component: () => import('../views/bill/Bill')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/user/User')
            }
        ]
    },
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
