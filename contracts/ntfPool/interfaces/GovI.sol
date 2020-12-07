pragma solidity ^0.5.0;

interface GovI {
  function () external payable;
  function deposit() external payable;
  function join(address _signer) external returns (bool);
  function leave() external returns (bool);
  function withdraw() external returns (bool);
  
  function getStatus(address _address) external view returns(uint256);
  function getBalance(address _address) external view returns(uint256);
  function getCoinbase(address _address) external view returns(address);
  function getUnlockHeight(address _address) external view returns(uint256);
  function isWithdrawable(address _address) external view returns(bool);
}