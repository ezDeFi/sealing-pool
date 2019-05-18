import UserControlPage from '@/module/page/usercontrol/Container'
import UserDataPage from '@/module/page/userdata/Container'

import PoolControlPage from '@/module/page/poolcontrol/Container'
import PoolDataPage from '@/module/page/pooldata/Container'
import PoolMakerPage from '@/module/page/poolmaker/Container'

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
    path: '/userdata',
    page: UserDataPage
  },
  {
    path: '/usercontrol',
    page: UserControlPage
  },
  {
    path: '/pooldata',
    page: PoolDataPage
  },
  {
    path: '/poolcontrol',
    page: PoolControlPage
  },
  {
    path: '/poolmaker',
    page: PoolMakerPage
  },
  {
    path: '/login',
    page: LoginPage
  },
  {
    page: NotFound
  }
]
