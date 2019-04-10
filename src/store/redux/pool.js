import BaseRedux from '@/model/BaseRedux'

class PoolRedux extends BaseRedux {
  defineTypes () {
    return ['pool']
  }

  defineDefaultState () {
    return {
      address: null,
      poolNtyBalance: 0,
      poolNtfBalance: 0,
      fund: 0,
      owner: null,
      ownerBalance: 0,
      signer: null,
      status: null,
      isWithdrawable: false,
      unlockHeight: 0,
      poolDeposited: 0
    }
  }
}

export default new PoolRedux()
