import BaseRedux from '@/model/BaseRedux'

class PoolRedux extends BaseRedux {
  defineTypes () {
    return ['pool']
  }

  defineDefaultState () {
    return {
      address: null,
      name: null,
      compRate: null,
      website: null,
      location: null,
      description: null,
      myPools: [],
      pools: [],
      selectedPool: null,
      poolNtyBalance: 0,
      poolNtfBalance: 0,
      lockDuration: 0,
      maxLockDuration: 0,
      ownerDelay: 0,
      fund: 0,
      owner: null,
      ownerBalance: 0,
      signer: null,
      status: null,
      isWithdrawable: false,
      unlockHeight: 0,
      poolDeposited: 0,
      stakeRequire: 500 * 1e18
    }
  }
}

export default new PoolRedux()
