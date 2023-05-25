export const constantRoute = [
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
  },
]
