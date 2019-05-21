import BaseService from '../../model/BaseService'
import Web3 from 'web3'
import _ from 'lodash' // eslint-disable-line
import { WEB3, CONTRACTS } from '@/constant'
export default class extends BaseService {
  async createPool (owner, compRate, maxLock, delay, name, website, location, description) {
    const store = this.store.getState()
    let methods = store.contracts.poolMaker.methods
    let wallet = store.user.wallet
    console.log(owner, compRate, maxLock, delay, name, website, location, description)
    methods.createPool(owner, compRate.toString(), maxLock.toString(), delay.toString(), name, website, location, description).send({from: wallet, gasPrice: '0' })
  }

  async selectPool (_address) {
    const store = this.store.getState()
    let contractsRedux = this.store.getRedux('contracts')
    let poolRedux = this.store.getRedux('pool')
    await this.dispatch(poolRedux.actions.selectedPool_update(_address))
    await this.dispatch(poolRedux.actions.address_update(_address))
    let web3 = store.user.web3
    let selectedNtfPool = new web3.eth.Contract(CONTRACTS.NtfPool.abi, _address)
    await this.dispatch(contractsRedux.actions.ntfPool_update(selectedNtfPool))
    this.loadLockDuration()
    this.loadMaxLockDuration()
    this.loadOwnerDelay()
  }

  async getPools () {
    console.log('loading Pools')
    const store = this.store.getState()
    let wallet = store.user.wallet
    let methods = store.contracts.poolMaker.methods
    let poolCount = await methods.getPoolCount().call()
    console.log('poolCount', poolCount)
    let pools = []
    let myPools = []
    for (let i = 0; i < poolCount; i++) {
      let pool = await methods.getPool(i).call()
      let poolOwner = await pool[1]
      await console.log('owner', poolOwner)
      await console.log('pool ' + i, pool)
      if (wallet.toLowerCase() === await poolOwner.toLowerCase()) {
        await console.log('You are owner of this pool')
        await myPools.push(pool)
      }
      await pools.push(pool)
    }
    const poolRedux = this.store.getRedux('pool')
    if (store.pool.selectedPool === null && myPools.length > 0) {
      let firstPoolAddress = await myPools[0][0]
      console.log('selectedPool = ', firstPoolAddress)
      await this.selectPool(firstPoolAddress)
    }
    await this.dispatch(poolRedux.actions.pools_update(pools))
    await this.dispatch(poolRedux.actions.myPools_update(myPools))
    return await pools
  }
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
    let stakeRequire = 500 * 1e18
    let wallet = store.user.wallet
    return await methods.join(stakeRequire.toString(), _signer).send({from: wallet})
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

  async setLockDuration (_duration) {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    return await methods.setLockDuration(_duration).send({from: wallet})
  }

  // members actions
  async deposit (_amount) {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    let wallet = store.user.wallet
    console.log('deposit', _amount)
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
    const store = this.store.getState()
    const poolRedux = this.store.getRedux('pool')
    let selectedPool = store.pool.selectedPool
    console.log('xxxx', selectedPool)
    await this.dispatch(poolRedux.actions.address_update(selectedPool))
  }

  async loadPoolInfo () {
    const store = this.store.getState()
    const poolRedux = this.store.getRedux('pool')
    let methods = store.contracts.ntfPool.methods
    let name = await methods.name().call()
    await this.dispatch(poolRedux.actions.name_update(name))
    let compRate = await methods.COMPRATE().call()
    await this.dispatch(poolRedux.actions.compRate_update(compRate))
    let website = await methods.website().call()
    await this.dispatch(poolRedux.actions.website_update(website))
    let location = await methods.location().call()
    await this.dispatch(poolRedux.actions.location_update(location))
    let description = await methods.profile().call()
    await this.dispatch(poolRedux.actions.description_update(description))
  }

/*   async loadStakeRequire () {
    const store = this.store.getState()
    console.log('contracts', store.contracts)
    let methods = store.contracts.nextyGovernance.methods
    console.log('contracts', store.contracts)
    const poolRedux = this.store.getRedux('pool')
    let _stakeRequire = await methods.stakeRequire().call()
    await this.dispatch(poolRedux.actions.stakeRequire_update(_stakeRequire))
    return await _stakeRequire
  } */

  async loadMaxLockDuration () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    const poolRedux = this.store.getRedux('pool')
    let _maxLockDuration = await methods.MAX_LOCK_DURATION().call()
    await this.dispatch(poolRedux.actions.maxLockDuration_update(_maxLockDuration))
    return await _maxLockDuration
  }

  async loadOwnerDelay () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    const poolRedux = this.store.getRedux('pool')
    let _delay = await methods.OWNER_ACTION_DELAY().call()
    await this.dispatch(poolRedux.actions.ownerDelay_update(_delay))
    return await _delay
  }

  async loadLockDuration () {
    const store = this.store.getState()
    let methods = store.contracts.ntfPool.methods
    const poolRedux = this.store.getRedux('pool')
    let _lockDuration = await methods.getLockDuration().call()
    await this.dispatch(poolRedux.actions.lockDuration_update(_lockDuration))
    return await _lockDuration
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
