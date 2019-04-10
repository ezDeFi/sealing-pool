import BaseService from '../../model/BaseService'
import Web3 from 'web3'
import _ from 'lodash' // eslint-disable-line
import { WEB3, CONTRACTS } from '@/constant'
export default class extends BaseService {

  async loadMyNtfBalance () {
    const store = this.store.getState()
    let wallet = store.user.wallet
    let _myNtfBalance = await this.getNtfBalanceByAddress(wallet)
    const userRedux = this.store.getRedux('user')
    await this.dispatch(userRedux.actions.ntfBalance_update(_myNtfBalance))
  }

  // read functions
  async getNtfBalanceByAddress (_address) {
    const store = this.store.getState()
    const methods = store.contracts.ntfToken.methods
    return await methods.balanceOf(_address).call()
  }
}
