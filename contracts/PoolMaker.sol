pragma solidity ^0.5.0;

import "./ntfPool/NtfPool.sol";

contract PoolMaker {
    address public ntfAddress;
    address public govAddress;
    address[] public pools;
    mapping(address => address) public poolOwner;

    constructor (
        address _ntfAddress,
        address _govAddress
    )
      public
    {
        ntfAddress = _ntfAddress;
        govAddress = _govAddress;
    }

    function createPool(
        address _owner,
        uint256 _TAX_PERCENT,
        uint256 _MAX_LOCK_DURATION,
        uint256 _OWNER_ACTION_DELAY
    )
        public
        returns (address)
    {
        NtfPool ntfPool = new NtfPool(
            _owner,
            ntfAddress,
            govAddress,
            _TAX_PERCENT,
            _MAX_LOCK_DURATION,
            _OWNER_ACTION_DELAY
        );
        pools.push(address(ntfPool));
        poolOwner[address(ntfPool)] = _owner;
        return (address(ntfPool));
    }

    // Read

    function getPoolCount()
        public
        view
        returns(uint256)
    {
        return pools.length;
    }

    function getPool(uint256 i)
        public
        view
        returns(address, address)
    {
        address _pAddress = pools[i];
        address _owner = poolOwner[_pAddress];
        return(_pAddress, _owner);
    }
}