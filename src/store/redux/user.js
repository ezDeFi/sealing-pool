import BaseRedux from '@/model/BaseRedux'

class UserRedux extends BaseRedux {
  defineTypes () {
    return ['user']
  }

  defineDefaultState () {
    return {
      is_login: false,
      is_admin: false,

      login_form: {
        privatekey: '',
        loading: false
      },

      web3: null,
      wallet: null,
      balance: 0,
      ntfBalance: 0,
      ntfDeposited: 0,
      isLocking: false,
      unlockTime: 0,
      loginMetamask: true
    }
  }
}

export default new UserRedux()
