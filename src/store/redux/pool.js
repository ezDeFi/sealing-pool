import BaseRedux from '@/model/BaseRedux'

class PoolRedux extends BaseRedux {
  defineTypes () {
    return ['pool']
  }

  defineDefaultState () {
    return {
      address: null
    }
  }
}

export default new PoolRedux()
