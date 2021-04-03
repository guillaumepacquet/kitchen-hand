import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import ShoppingList from '@/views/Shopping-list.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Recipe from '@/views/Recipe.vue';
import { auth } from '@/firebase';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/shopping-list',
        name: 'ShoppingList',
        component: ShoppingList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/recipe/:id',
        name: 'Recipe',
        component: Recipe,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

    if (requiresAuth && !auth.currentUser) {
        next('/login');
    } else {
        next();
    }
});

export default router;
