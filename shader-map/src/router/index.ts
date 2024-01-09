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
    }

]
const router = createRouter({
        history: createWebHistory(),
        routes
    });
export default router;
