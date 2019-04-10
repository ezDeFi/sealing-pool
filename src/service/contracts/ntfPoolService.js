import BaseService from '../../model/BaseService'
import Web3 from 'web3'
import _ from 'lodash' // eslint-disable-line
import { WEB3, CONTRACTS } from '@/constant'
export default class extends BaseService {
  // pool's owner acctions
  async claimFund () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    return await methods.fundWithdraw(wallet).send({from: wallet})
  }

  async joinGov (_signer) {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    return await methods.join(10e18.toString(), _signer).send({from: wallet})
  }

  async leaveGov () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    return await methods.leave().send({from: wallet})
  }

  async tokenPoolWithdraw () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    return await methods.tokenPoolWithdraw().send({from: wallet})
  }

  // members actions
  async deposit (_amount) {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    return await methods.tokenDeposit(_amount.toString()).send({from: wallet})
  }

  async withdraw (_amount) {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    return await methods.tokenMemberWithdraw(_amount.toString()).send({from: wallet})
  }

  async claim () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    return await methods.coinWithdraw().send({from: wallet})
  }

  async virtuellMining () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    return await methods.virtuellMining().send({from: wallet, value: 3e18})
  }
  // load pool's datas

  async loadPoolAddress () {
    const poolRedux = this.store.getRedux('pool')
    await this.dispatch(poolRedux.actions.address_update(CONTRACTS.NtfPool.address))
  }

  async loadOwner () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    const poolRedux = this.store.getRedux('pool')
    let _owner = await methods.owner().call()
    let web3 = store.user.web3
    const _ownerBalance = await web3.eth.getBalance(_owner)
    await this.dispatch(poolRedux.actions.owner_update(_owner))
    await this.dispatch(poolRedux.actions.ownerBalance_update(_ownerBalance))
    return await _owner
  }

  async loadFund () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    const poolRedux = this.store.getRedux('pool')
    let _res = await methods.getCurFundCpt().call()
    let _fund = _res[0]
    await this.dispatch(poolRedux.actions.fund_update(_fund))
    return await _fund
  }

  async loadPoolNtfBalance () {
    const store = this.store.getState()
    let _address = CONTRACTS.NtfPool.address
    let methods = store.contracts.ntfToken.methods
    const poolRedux = this.store.getRedux('pool')
    let _poolNtfBalance = await methods.balanceOf(_address).call()
    await this.dispatch(poolRedux.actions.poolNtfBalance_update(_poolNtfBalance))
    return await _poolNtfBalance
  }

  async loadPoolNtyBalance () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    const poolRedux = this.store.getRedux('pool')
    let _poolNtyBalance = await methods.getMembersBalance().call()
    await this.dispatch(poolRedux.actions.poolNtyBalance_update(_poolNtyBalance))
    return await _poolNtyBalance
  }

  async loadPoolSigner () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    const poolRedux = this.store.getRedux('pool')
    let _signer = await methods.getCoinbase().call()
    await this.dispatch(poolRedux.actions.signer_update(_signer))
    return await _signer
  }

  async loadPoolStatus () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    const poolRedux = this.store.getRedux('pool')
    let _status = await methods.getStatus().call()
    await this.dispatch(poolRedux.actions.status_update(_status))
    return await _status
  }

  async loadPoolDeposited () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    const poolRedux = this.store.getRedux('pool')
    let _deposited = await methods.getBalance().call()
    await this.dispatch(poolRedux.actions.poolDeposited_update(_deposited))
    return await _deposited
  }

  async loadPoolUnlockHeight () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    const poolRedux = this.store.getRedux('pool')
    let _unlockHeight = await methods.getUnlockHeight().call()
    await this.dispatch(poolRedux.actions.unlockHeight_update(_unlockHeight))
    return await _unlockHeight
  }

  async loadPoolIsWithdrawable () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    const poolRedux = this.store.getRedux('pool')
    let _isWithdrawable = await methods.isWithdrawable().call()
    await this.dispatch(poolRedux.actions.isWithdrawable_update(_isWithdrawable))
    return await _isWithdrawable
  }

  // load user's datas
  async loadMyRewardBalance () {
    let userRedux = this.store.getRedux('user')
    let store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    let rewardBalance = await methods.getCoinOf(wallet).call()
    await this.dispatch(userRedux.actions.rewardBalance_update(rewardBalance))
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
