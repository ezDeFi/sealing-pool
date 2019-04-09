import BaseRedux from '@/model/BaseRedux'

class ContractRedux extends BaseRedux {
  defineTypes () {
    return ['contracts']
  }

  defineDefaultState () {
    return {
      web3: null,
      ntfToken: null,
      ntfPool: null
    }
  }
}

export default new ContractRedux()
