import Vue from "vue/dist/vue.esm.js";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";

import Books from "@/components/library/Books"
import Forget from "@/components/forget"
import show from "@/components/show"
import AdminIndex from "@/components/admin/AdminIndex";
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import LibraryIndex from '../components/library/LibraryIndex'
import wantedlist from '@/components/wantedlist'
import Element from 'element-ui'
import userinfo from '@/components/UserInfo'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "Home",
        //redirect: './home',
        component: Home,
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'AppIndex',
                component: AppIndex,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/library',
                name: 'LibraryIndex',
                component: LibraryIndex,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/wantedlist',
                name: 'wantedlist',
                component: wantedlist,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: "/show",
                name: "show",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: show
            },
            {
                path: '/userinfo',
                name: 'userinfo',
                component: userinfo,
                meta: {
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminIndex,
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: '/admin/dashboard',
                name: 'Dashboard',
                component: () => import('@/components/admin/dashboard/admin/index'),
                meta: {
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: "/wantedlist",
        name: "wantedlist",
        component: wantedlist
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/forget',
        name: 'forget',
        component: Forget
    },
    {
        path: '/',
        name: 'index',
        redirect: '/index',
        component: AppIndex,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../components/Register')
    },

];

export const createRouter = routes => new Router(
    {
        path: "/home",
        name: "Home",
        //redirect: './home',
        component: Home,
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'AppIndex',
                component: AppIndex,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/library',
                name: 'LibraryIndex',
                component: LibraryIndex,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/wantedlist',
                name: 'wantedlist',
                component: wantedlist,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: "/show",
                name: "show",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: show
            },
            {
                path: '/userinfo',
                name: 'userinfo',
                component: userinfo,
                meta: {
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../components/admin/AdminIndex'),
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: '/admin/dashboard',
                name: 'Dashboard',
                component: () => import('../components/admin/dashboard/admin/index'),
                meta: {
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: "/wantedlist",
        name: "wantedlist",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: wantedlist
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/forget',
        name: 'forget',
        component: Forget
    },
    {
        path: '/',
        name: 'index',
        redirect: '/index',
        component: AppIndex,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../components/Register')
    }
)

const LOGIN_PAGE_NAME = 'login'

const router = new VueRouter({
    mode: 'history',
    routes: routes
});


export default router;
