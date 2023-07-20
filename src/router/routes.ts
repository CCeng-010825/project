export const constantRoute = [
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'Calendar',
    },
  },
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: true,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Platform',
    },
  },
  // {
  //   path: '/fit',
  //   component: () => import('@/layout/index.vue'),
  //   name: 'Fit',
  //   meta: {
  //     hidden: false,
  //     title: '抽奖1测试',
  //     icon: 'Platform',
  //   },
  //   redirect: '/choujiang/index',
  //   children: [
  //     {
  //       path: '/choujiang/index',
  //       component: () => import('@/views/fit/choujiang/index.vue'),
  //       name: 'Benefit',
  //       meta: {
  //         title: '抽啊抽',
  //         icon: 'User',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/ce',
  //   component: () => import('@/layout/index.vue'),
  //   name: '测试',
  //   meta: {
  //     hidden: false,
  //     title: '测试测试',
  //     icon: 'Platform',
  //   },
  //   redirect: '/ce/index',
  //   children: [
  //     {
  //       path: '/ce/index',
  //       component: () => import('@/views/ce/index.vue'),
  //       name: 'List',
  //       meta: {
  //         title: '1',
  //         icon: 'User',
  //       },
  //     },
  //     {
  //       path: '/ce/vacation',
  //       component: () => import('@/views/ce/vacation.vue'),
  //       name: 'Vacation',
  //       meta: {
  //         title: '2',
  //         icon: 'UserFilled',
  //       },
  //     },
  //     {
  //       path: '/ce/search',
  //       component: () => import('@/views/ce/search.vue'),
  //       name: 'Search',
  //       meta: {
  //         title: '3',
  //         icon: 'Monitor',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
  },
]
