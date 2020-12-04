import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/merchants',
    component: Layout,
    name: '商户管理',
    meta: { title: '商户管理', icon: 'el-icon-s-goods' },
    children: [
      {
        path: 'examine',
        name: '商户审核',
        component: () => import('@/views/merchants/examine'),
        meta: { title: '商户审核', icon: 'el-icon-s-goods' }
      },
      {
        path: 'examineOrder',
        name: '商户订单',
        component: () => import('@/views/merchants/order'),
        hidden: true,
        meta: { title: '商户订单', icon: 'el-icon-s-goods' }
      }
    ]
  },
  {
    path: '/property',
    component: Layout,
    name: '物业管理',
    meta: { title: '物业管理', icon: 'el-icon-s-goods' },
    children: [
      {
        path: 'propertyAdministration',
        name: '物业管理',
        component: () => import('@/views/property/propertyAdministration'),
        meta: { title: '物业管理', icon: 'el-icon-s-goods' }
      },
      {
        path: 'roleManagement',
        name: '角色管理',
        component: () => import('@/views/property/roleManagement'),
        meta: { title: '角色管理', icon: 'el-icon-s-goods' }
      }
    ]
  },
  {
    path: '/hot',
    component: Layout,
    name: '热点管理',
    meta: { title: '热点管理', icon: 'el-icon-s-goods' },
    children: [
      {
        path: '/hotList',
        name: '热点管理',
        component: () => import('@/views/hotList/hotList'),
        meta: { title: '热点管理', icon: 'el-icon-s-goods' }
      }
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
