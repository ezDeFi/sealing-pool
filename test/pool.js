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
        value: 1,
      })
    })

    it("tokenDeposit: acc2 with 2", async() => {
      await instPool.tokenDeposit({
        from: accounts[2],
        value: 2,
      })
    })

    it("total pool stake", async() => {
      const totalPoolStake = await instPool.getPoolNtfBalance({from: accounts[1]})
      console.log(totalPoolStake.toString())
    })

    it("member stake", async() => {
      const balance = await instPool.balanceOf(accounts[1])
      console.log(balance.toString())
    })

    // it("memeber requestOut: more than have", async() => {
    //   await instPool.requestOut(2, {from: accounts[1]})
    //   // Error: Transaction: 0x6ca84c138b42ce50e3ad4f70ba19a4debe79a8f22d6b11cea9750cf628aa6fc7 exited with an error (status 0).
    //   // await expectRevert(instPool.requestOut(2, {from: accounts[1]}), '')
    // })

    it("memeber requestOut: just enough", async() => {
      await instPool.requestOut(1, {from: accounts[1]})
    })

    it("member token withdraw: still locking", async() => {
      await expectRevert(instPool.tokenMemberWithdraw({from: accounts[1]}), 'still locking')
    })
  })
})
