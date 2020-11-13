const { expect } = require('chai');
const { time, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { duration } = require('moment');
const { BN } = require('web3').utils;

const PoolMaker = artifacts.require("PoolMaker");
const Pool = artifacts.require("NtfPool");
let instPoolMaker;
let instPool;

contract("PoolMaker", accounts => {
  before('should our contracts be deployed', async () => {
    instPoolMaker = await PoolMaker.deployed();
    expect(instPoolMaker, 'contract not deployed: PoolMaker').to.not.be.null
  });

  describe('sticky', () => {
    it("create pool", async() => {
      const tx = await instPoolMaker.createPool(
        accounts[0],
        13, // comrate %
        60, // max lock duration
        10, // owner action delay
        'foobar',
        'foobar.io',
        'foo',
        'bar',
      )
      const poolAddress = tx.logs[0].args._address
      instPool = await Pool.at(poolAddress)
      expect(instPool, 'contract not deployed: Pool').to.not.be.null
    })

    it("tokenDeposit: acc1 with 1", async() => {
      await instPool.tokenDeposit({
        from: accounts[1],
        value: 1+'0'.repeat(18),
      })
    })

    it("tokenDeposit: acc2 with 2", async() => {
      await instPool.tokenDeposit({
        from: accounts[2],
        value: 2+'0'.repeat(18),
      })
    })

    it("total pool stake", async() => {
      const totalPoolStake = await instPool.getPoolNtfBalance()
      expect(totalPoolStake).to.be.bignumber.equal(new BN(3+'0'.repeat(18)))
    })

    it("member stake", async() => {
      expect(await instPool.balanceOf(accounts[1])).to.be.bignumber.equal(new BN(1+'0'.repeat(18)))
      expect(await instPool.balanceOf(accounts[2])).to.be.bignumber.equal(new BN(2+'0'.repeat(18)))
    })

    // it("memeber requestOut: more than have", async() => {
    //   await instPool.requestOut(2, {from: accounts[1]})
    //   // Error: Transaction: 0x... exited with an error (status 0).
    //   // await expectRevert(instPool.requestOut(2, {from: accounts[1]}), expectRevert.unspecified)
    // })

    it("memeber acc1 requestOut: just enough", async() => {
      await instPool.requestOut(1+'0'.repeat(18), {from: accounts[1]})
    })

    it("member acc1 token withdraw: still locking", async() => {
      await expectRevert(instPool.tokenMemberWithdraw({from: accounts[1]}), 'still locking')
    })

    it("pool change lock duration", async() => {
      await instPool.setLockDuration(1)
    })

    it("memeber acc2 requestOut: just enough", async() => {
      await instPool.requestOut(2+'0'.repeat(18), {from: accounts[2]})
    })

    it("member acc2 token withdraw: not joined", async() => {
      // TODO: this is an actual legacy bug
      await expectRevert(instPool.tokenMemberWithdraw({from: accounts[2]}), 'not joined')
    })

    it("tokenDeposit: acc3 with 100", async() => {
      await instPool.tokenDeposit({
        from: accounts[3],
        value: 100 + '0'.repeat(18),
      })
    })

    it("total pool stake", async() => {
      const totalPoolStake = await instPool.getPoolNtfBalance()
      expect(totalPoolStake).to.be.bignumber.equal(new BN(103+'0'.repeat(18)))
    })

    it("gov join", async() => {
      await instPool.join(100+'0'.repeat(18), accounts[4])
    })

    it("memeber acc3 requestOut: just enough", async() => {
      await instPool.requestOut(100+'0'.repeat(18), {from: accounts[3]})
    })

    it("member acc3 token withdraw: joined", async() => {
      await instPool.tokenMemberWithdraw({from: accounts[3]})
    })

    it("gov leave", async() => {
      await instPool.leave()
    })
  })
})
