pragma solidity ^0.5.0;

interface NtfTokenI {
  function approve(address _spender, uint256 _value) external returns(bool);
  function transferFrom(address _from, address _to, uint256 _value) external returns (bool);
  function transfer(address _to, uint256 _value) external returns (bool);

  function balanceOf(address _address) external view returns(uint256);

  // WZD
  function deposit() external payable returns(bool);
  function withdraw(uint _amount) external returns(bool);
  function depositTo(address _to) external payable returns(bool);
  function withdrawTo(uint _amount, address payable _to) external returns(bool);
}