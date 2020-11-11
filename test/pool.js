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
  })
})
