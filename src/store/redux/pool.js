import BaseRedux from '@/model/BaseRedux'

class PoolRedux extends BaseRedux {
  defineTypes () {
    return ['pool']
  }

  defineDefaultState () {
    return {
    }
  }
}

export default new PoolRedux()
