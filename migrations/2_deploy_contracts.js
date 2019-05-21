var NtfPool = artifacts.require('./ntfPool/NtfPool.sol');
var PoolMaker = artifacts.require('./PoolMaker.sol');
// var NtfTokenI = artifacts.require('./ntfPool/interfaces/NtfTokenI.sol');
// var GovI = artifacts.require('./ntfPool/interfaces/GovI.sol');
// var Coinshare = artifacts.require('./ntfPool/CoinShare.sol');
// var Lockable = artifacts.require('./ntfPool/Lockable.sol');
// var Ownable = artifacts.require('openzeppelin-eth/contracts/ownership/Ownable.sol');

const ONE_DAY = 24 * 60 * 60
const _COMPRATE = 10
const _MAX_LOCK_DURATION = 30 * ONE_DAY
const _OWNER_ACTION_DELAY = 7 * ONE_DAY

module.exports = function (deployer) {
    const _owner = '0x95e2fcBa1EB33dc4b8c6DCBfCC6352f0a253285d'
    const ntfAddress = '0x2c783ad80ff980ec75468477e3dd9f86123ecbda'
    const govAddress = '0x0000000000000000000000000000000000012345'
    // const ntfAddress = '0x8ebda672a038189dfea16f34c6b060f6a498d32a'
    // const govAddress = '0x3ff6bc5826c45395e22b2fc5f00bf9b55cb6daab'
    console.log('ntfAddress', ntfAddress)
    console.log('govAddress', govAddress)
    // await deployer.deploy(GovI)
    // await deployer.deploy(NtfTokenI)
    //await deployer.deploy(Coinshare)
    // await deployer.deploy(Lockable)
    // await deployer.deploy(Ownable)

    // await deployer.link(NtfTokenI, NtfPool);
    // await deployer.link(GovI, NtfPool);
    //await deployer.link(Coinshare, NtfPool);
    // await deployer.link(Ownable, NtfPool);
    // await deployer.link(Lockable, NtfPool);

    deployer.deploy(
        NtfPool,
        _owner,
        ntfAddress,
        govAddress,
        _COMPRATE,
        _MAX_LOCK_DURATION,
        _OWNER_ACTION_DELAY,
        'Demo Pool',
        'https://demo.pool.nexty.io',
        'Ha Noi',
        'Demo Pool Profile'

    ).then(async function () {
    })

    deployer.deploy(
        PoolMaker,
        ntfAddress,
        govAddress,
    ).then(async function () {
    })
}