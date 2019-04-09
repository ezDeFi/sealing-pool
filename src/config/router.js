import DashboardPage from '@/module/page/dashboard/Container'

import LoginPage from '@/module/page/login/Container'

import NotFound from '@/module/page/error/NotFound'

export default [
  {
    path: '/',
    page: LoginPage
  },
  {
    path: '/home',
    page: LoginPage
  },
  {
    path: '/dashboard',
    page: DashboardPage
  },
  {
    path: '/login',
    page: LoginPage
  },
  {
    page: NotFound
  }
]
