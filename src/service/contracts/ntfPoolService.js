import BaseService from '../../model/BaseService'
import Web3 from 'web3'
import _ from 'lodash' // eslint-disable-line
import { WEB3, CONTRACTS } from '@/constant'
export default class extends BaseService {
  async loadPoolAddress () {
    const poolRedux = this.store.getRedux('pool')
    console.log(CONTRACTS.NtfPool.address)
    await this.dispatch(poolRedux.actions.address_update(CONTRACTS.NtfPool.address))
  }

  async loadIsLocking () {
    let userRedux = this.store.getRedux('user')
    let store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    let locked = await methods.isLocking(wallet).call()
    await this.dispatch(userRedux.actions.isLocking_update(locked))
  }

  async loadUnlockTime () {
    let userRedux = this.store.getRedux('user')
    let store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    let unlockTime = await methods.getUnlockTime(wallet).call()
    await this.dispatch(userRedux.actions.unlockTime_update(unlockTime))
  }

  async loadMyDepositedNtf () {
    let userRedux = this.store.getRedux('user')
    let store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    let deposited = await methods.balanceOf(wallet).call()
    await this.dispatch(userRedux.actions.ntfDeposited_update(deposited))
  }

  // read functions
}
