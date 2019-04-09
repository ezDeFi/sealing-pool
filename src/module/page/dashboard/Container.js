import { createContainer } from '@/util'
import Component from './Component'
// import NTFToken from '@/service/NTFToken'
// import NextyManager from '@/service/NextyManager'
import UserService from '@/service/UserService'
var curWallet = null
export default createContainer(Component, async (state) => {
  const userService = new UserService()
  if (state.user.wallet !== curWallet && !curWallet) {
    curWallet = state.user.wallet
    await userService.getBalance()
  }

  return {
    ...state.user
  }
}, () => {
  // const ntfTokenService = new NTFToken()
  // const nextyManagerService = new NextyManager()
  const userService = new UserService()

  return {

    getWallet () {
      userService.getWallet()
    },
    async getBalance () {
      await userService.getBalance()
    }
  }
})
