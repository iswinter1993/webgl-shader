import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        meta: {
        title: '首页',
        keepAlive: false,
        requireAuth: true
        },
        component: () => import('@/pages/index.vue')
    },
    {
        path: '/img',
        name: 'img',
        meta: {
        title: '图片',
        keepAlive: true,
        requireAuth: true
        },
        component: () => import('@/pages/imgshader/index.vue')
    },
    {
        path: '/ball',
        name: 'ball',
        meta: {
        title: 'ball',
        keepAlive: true,
        requireAuth: true
        },
        component: () => import('@/pages/waterball/index.vue')
    },
    {
        path: '/mesh',
        name: 'mesh',
        meta: {
        title: 'mesh',
        keepAlive: true,
        requireAuth: true
        },
        component: () => import('@/pages/meshball/index.vue')
    }

]
const router = createRouter({
        history: createWebHistory(),
        routes
    });
export default router;
