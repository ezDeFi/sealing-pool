pragma solidity ^0.5.0;

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function transferFrom(address from, address to, uint256 value) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address who) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract Lockable {
    mapping(address => uint256) internal unlockTime;
    uint256 internal lockDuration;
    uint256 public MAX_LOCK_DURATION; // = 30 days;

    modifier notLocking() {
        require(!isLocking(msg.sender), "still locking");
        _;
    }

    modifier validLockDuration(uint256 _lockDuration) {
        require(_lockDuration <= MAX_LOCK_DURATION, "dont lock too long");
        _;
    }

    function _setLockDuration(
        uint256 _lockDuration
    )
        internal
        validLockDuration(_lockDuration)
    {
        lockDuration = _lockDuration;
    }

    function _setLock(
        address _member
    )
        internal
    {
        unlockTime[_member] = block.timestamp + lockDuration;
    }

    function _relock(
        address _member
    )
        internal
    {
        unlockTime[_member] = 0;
    }

    // Read Functions

    function getUnlockTime(
        address _member
    )
        public
        view
        returns(uint256)
    {
        return unlockTime[_member];
    }

    function getLockDuration()
        public
        view
        returns(uint256)
    {
        return lockDuration;
    }

    function isLocking(
        address _member
    )
        public
        view
        returns(bool)
    {
        return unlockTime[_member] > block.timestamp;
    }
}

interface NtfTokenI {
  function approve(address _spender, uint256 _value) external returns(bool);
  function transferFrom(address _from, address _to, uint256 _value) external returns (bool);
  function transfer(address _to, uint256 _value) external returns (bool);

  function balanceOf(address _address) external view returns(uint256);
}

interface GovI {
  function deposit(uint256 _amount) external returns (bool);
  function join(address _signer) external returns (bool);
  function leave() external returns (bool);
  function withdraw() external returns (bool);
  
  function getStatus(address _address) external view returns(uint256);
  function getBalance(address _address) external view returns(uint256);
  function getCoinbase(address _address) external view returns(address);
  function getUnlockHeight(address _address) external view returns(uint256);
  function isWithdrawable(address _address) external view returns(bool);
}






/**
 * @title Initializable
 *
 * @dev Helper contract to support initializer functions. To use it, replace
 * the constructor with a function that has the `initializer` modifier.
 * WARNING: Unlike constructors, initializer functions must be manually
 * invoked. This applies both to deploying an Initializable contract, as well
 * as extending an Initializable contract via inheritance.
 * WARNING: When used with inheritance, manual care must be taken to not invoke
 * a parent initializer twice, or ensure that all initializers are idempotent,
 * because this is not dealt with automatically as with constructors.
 */
contract Initializable {

  /**
   * @dev Indicates that the contract has been initialized.
   */
  bool private initialized;

  /**
   * @dev Indicates that the contract is in the process of being initialized.
   */
  bool private initializing;

  /**
   * @dev Modifier to use in the initializer function of a contract.
   */
  modifier initializer() {
    require(initializing || isConstructor() || !initialized, "Contract instance has already been initialized");

    bool wasInitializing = initializing;
    initializing = true;
    initialized = true;

    _;

    initializing = wasInitializing;
  }

  /// @dev Returns true if and only if the function is running in the constructor
  function isConstructor() private view returns (bool) {
    // extcodesize checks the size of the code stored in an address, and
    // address returns the current address. Since the code is still not
    // deployed when running a constructor, any checks on its code size will
    // yield zero, making it an effective way to detect if a contract is
    // under construction or not.
    uint256 cs;
    assembly { cs := extcodesize(address) }
    return cs == 0;
  }

  // Reserved storage space to allow for layout changes in the future.
  uint256[50] private ______gap;
}


/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable is Initializable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    function initialize(address sender) public initializer {
        _owner = sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @return the address of the owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner());
        _;
    }

    /**
     * @return true if `msg.sender` is the owner of the contract.
     */
    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    /**
     * @dev Allows the current owner to relinquish control of the contract.
     * @notice Renouncing to ownership will leave the contract without an owner.
     * It will not be possible to call the functions with the `onlyOwner`
     * modifier anymore.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0));
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }

    uint256[50] private ______gap;
}





/**
 * @title SafeMath
 * @dev Unsigned math operations with safety checks that revert on error
 */
library SafeMath {
    /**
    * @dev Multiplies two unsigned integers, reverts on overflow.
    */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    /**
    * @dev Integer division of two unsigned integers truncating the quotient, reverts on division by zero.
    */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
    * @dev Subtracts two unsigned integers, reverts on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    /**
    * @dev Adds two unsigned integers, reverts on overflow.
    */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }

    /**
    * @dev Divides two unsigned integers and returns the remainder (unsigned integer modulo),
    * reverts when dividing by zero.
    */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}






/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 * Originally based on code by FirstBlood:
 * https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 *
 * This implementation emits additional Approval events, allowing applications to reconstruct the allowance status for
 * all accounts just by listening to said events. Note that this isn't required by the specification, and other
 * compliant implementations may not do it.
 */
contract ERC20 is IERC20 {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowed;

    uint256 private _totalSupply;

    /**
    * @dev Total number of tokens in existence
    */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
    * @dev Gets the balance of the specified address.
    * @param owner The address to query the balance of.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    /**
     * @dev Function to check the amount of tokens that an owner allowed to a spender.
     * @param owner address The address which owns the funds.
     * @param spender address The address which will spend the funds.
     * @return A uint256 specifying the amount of tokens still available for the spender.
     */
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowed[owner][spender];
    }

    /**
    * @dev Transfer token for a specified address
    * @param to The address to transfer to.
    * @param value The amount to be transferred.
    */
    function transfer(address to, uint256 value) public returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
     * Beware that changing an allowance with this method brings the risk that someone may use both the old
     * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
     * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     * @param spender The address which will spend the funds.
     * @param value The amount of tokens to be spent.
     */
    function approve(address spender, uint256 value) public returns (bool) {
        require(spender != address(0));

        _allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    /**
     * @dev Transfer tokens from one address to another.
     * Note that while this function emits an Approval event, this is not required as per the specification,
     * and other compliant implementations may not emit the event.
     * @param from address The address which you want to send tokens from
     * @param to address The address which you want to transfer to
     * @param value uint256 the amount of tokens to be transferred
     */
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
        _transfer(from, to, value);
        emit Approval(from, msg.sender, _allowed[from][msg.sender]);
        return true;
    }

    /**
     * @dev Increase the amount of tokens that an owner allowed to a spender.
     * approve should be called when allowed_[_spender] == 0. To increment
     * allowed value is better to use this function to avoid 2 calls (and wait until
     * the first transaction is mined)
     * From MonolithDAO Token.sol
     * Emits an Approval event.
     * @param spender The address which will spend the funds.
     * @param addedValue The amount of tokens to increase the allowance by.
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        require(spender != address(0));

        _allowed[msg.sender][spender] = _allowed[msg.sender][spender].add(addedValue);
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    /**
     * @dev Decrease the amount of tokens that an owner allowed to a spender.
     * approve should be called when allowed_[_spender] == 0. To decrement
     * allowed value is better to use this function to avoid 2 calls (and wait until
     * the first transaction is mined)
     * From MonolithDAO Token.sol
     * Emits an Approval event.
     * @param spender The address which will spend the funds.
     * @param subtractedValue The amount of tokens to decrease the allowance by.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        require(spender != address(0));

        _allowed[msg.sender][spender] = _allowed[msg.sender][spender].sub(subtractedValue);
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    /**
    * @dev Transfer token for a specified addresses
    * @param from The address to transfer from.
    * @param to The address to transfer to.
    * @param value The amount to be transferred.
    */
    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0));

        _balances[from] = _balances[from].sub(value);
        _balances[to] = _balances[to].add(value);
        emit Transfer(from, to, value);
    }

    /**
     * @dev Internal function that mints an amount of the token and assigns it to
     * an account. This encapsulates the modification of balances such that the
     * proper events are emitted.
     * @param account The account that will receive the created tokens.
     * @param value The amount that will be created.
     */
    function _mint(address account, uint256 value) internal {
        require(account != address(0));

        _totalSupply = _totalSupply.add(value);
        _balances[account] = _balances[account].add(value);
        emit Transfer(address(0), account, value);
    }

    /**
     * @dev Internal function that burns an amount of the token of a given
     * account.
     * @param account The account whose tokens will be burnt.
     * @param value The amount that will be burnt.
     */
    function _burn(address account, uint256 value) internal {
        require(account != address(0));

        _totalSupply = _totalSupply.sub(value);
        _balances[account] = _balances[account].sub(value);
        emit Transfer(account, address(0), value);
    }

    /**
     * @dev Internal function that burns an amount of the token of a given
     * account, deducting from the sender's allowance for said account. Uses the
     * internal burn function.
     * Emits an Approval event (reflecting the reduced allowance).
     * @param account The account whose tokens will be burnt.
     * @param value The amount that will be burnt.
     */
    function _burnFrom(address account, uint256 value) internal {
        _allowed[account][msg.sender] = _allowed[account][msg.sender].sub(value);
        _burn(account, value);
        emit Approval(account, msg.sender, _allowed[account][msg.sender]);
    }
}


contract CoinShare is ERC20{
    using SafeMath for uint256;

    //CPT ZOOMED
    uint256 constant public CPT_ZOOM = 2**40;
    uint256 public COMPRATE;

    mapping(address => int256) private credit;

    // coin per token
    uint256 private cpt;
    uint256 private fund;
    uint256 private lastBalance;

    // Pooltokens are not transferable
    // overwrite ERC20
    function transfer(address to, uint256 value) public returns (bool) {
        return to == address(0) && value == 0;
    }

    function _updateFundCpt()
        internal
    {
        (fund, cpt) = getCurFundCpt();
        lastBalance = address(this).balance;
    }

    function _fundWithdraw(
        address payable _toAddress
    )
        internal
    {
        _updateFundCpt();
        uint256 _fund = fund;
        fund = 0;
        lastBalance = lastBalance.sub(_fund);
        _toAddress.transfer(_fund);
    }

    function _coinWithdraw(
        address payable _member
    )
        internal
    {
        _updateFundCpt();
        uint256 _amount = coinOf(_member);
        credit[_member] = credit[_member] + int256(_amount);
        lastBalance = lastBalance.sub(_amount);
        coinOf(_member);
        _member.transfer(_amount);
    }
    // CREDIT NEGATIVE IN CASE TOKEN WITHDRAW
    // NEED FIXED
    function _updateCredit(
        address _member,
        uint256 _memberBalance
    )
        internal
    {
        credit[_member] = int256(balanceOf(_member).mul(cpt) / CPT_ZOOM) - int256(_memberBalance);
    }

    function coinOf(
        address _member
    )
        internal
        view
        returns(uint256)
    {
        return uint256(
            int256(balanceOf(_member).mul(cpt) / CPT_ZOOM) - credit[_member]
            );
    }

    // read functions
    function getCurFundCpt()
        public
        view
        returns(uint256, uint256)
    {
        uint256 _addedBalance = address(this).balance.sub(lastBalance);
        uint256 _addedFund = _addedBalance * COMPRATE / 100;
        if (totalSupply() == 0) {
            return (fund.add(_addedBalance), 0);
        }
        uint256 _addedCpt = (_addedBalance.sub(_addedFund)).mul(CPT_ZOOM) / totalSupply();
        return (fund.add(_addedFund), cpt.add(_addedCpt));
    }

    function getCoinOf(
        address _member
    )
        public
        view
        returns(uint256)
    {
        (uint256 _fund, uint256 _cpt) = getCurFundCpt();
        return uint256(int256(balanceOf(_member).mul(_cpt) / CPT_ZOOM) - credit[_member]);
    }

    function getMembersBalance()
        public
        view
        returns(uint256)
    {
        (uint256 _fund, uint256 _cpt) = getCurFundCpt();
        return (address(this).balance.sub(_fund));
    }
}



contract Request is Lockable {
    uint256 public pendingOutSum;

    mapping(address => uint256) public pendingOut;

    function _requestOut(
        address _sender,
        uint256 _amount)
        internal
        returns (uint256)
    {
        require(_amount > pendingOut[_sender], "new amount must be greater than the older");
        uint256 _added = _amount - pendingOut[_sender];
        pendingOut[_sender] = _amount;
        pendingOutSum += _amount;
        _setLock(_sender);
        return _added;
    }

    function _removeRequest(
        address _sender
    )
        internal
    {
        pendingOutSum -= pendingOut[_sender];
        pendingOut[_sender] = 0;
        _relock(_sender);
    }
}




contract PoolDesc {
    string public name;
    string public website;
    string public location;
    string public email;
    string public logo;

    constructor (
        string memory _name,
        string memory _website,
        string memory _location,
        string memory _logo
    ) public {
        name = _name;
        website = _website;
        location = _location;
        logo = _logo;
    }
}

contract NtfPool is PoolDesc, CoinShare, Ownable, Request {
    uint256 public OWNER_ACTION_DELAY; // = 7 days;

    uint256 lastActionTime;

    NtfTokenI public ntfToken;
    GovI public gov;

    modifier delayPast() {
        require(block.timestamp > lastActionTime + OWNER_ACTION_DELAY, "dont change to quick");
        _;
    }

    function () external payable {}

    constructor
    (
        address _owner,
        address _ntfAddress,
        address _govAddress,
        uint256 _COMPRATE,
        uint256 _MAX_LOCK_DURATION,
        uint256 _OWNER_ACTION_DELAY,
        string memory _name,
        string memory _website,
        string memory _location,
        string memory _logo
    )
        public
        PoolDesc(_name, _website, _location, _logo)
    {
        ntfToken = NtfTokenI(_ntfAddress);
        gov = GovI(_govAddress);
        require(_COMPRATE >= 0 && _COMPRATE <= 100, "invalid compensation rate");
        COMPRATE = _COMPRATE;
        MAX_LOCK_DURATION = _MAX_LOCK_DURATION;
        _setLockDuration(60);
        OWNER_ACTION_DELAY = _OWNER_ACTION_DELAY;
        initialize(_owner);
    }

    // owner function
    // function deposit(uint256 _amount) external returns (bool);
    // function join(address _signer) external returns (bool);
    // function leave() external returns (bool);
    // function withdraw() external returns (bool);

    function join(
        uint256 _amount,
        address _signer
    )
        public
        onlyOwner()
    {
        require(_amount.add(pendingOutSum) <= getPoolNtfBalance(), "not enough to join");
        ntfToken.approve(address(gov), _amount);
        gov.deposit(_amount);
        gov.join(_signer);
    }

    function _leave()
        internal
    {
        gov.leave();
    }

    function leave()
        public
        onlyOwner()
    {
        _leave();
    }

    function tokenPoolWithdraw()
        public
        //onlyOwner()
    {
        gov.withdraw();
    }

    function fundWithdraw(
        address payable _toAddress
    )
        public
        onlyOwner()
    {
        _fundWithdraw(_toAddress);
    }

    function setLockDuration(
        uint256 _lockDuration
    )
        public
        onlyOwner()
        delayPast()
    {
        lastActionTime = block.timestamp;
        _setLockDuration(_lockDuration);
    }

    // members function
    function requestOut(
        uint256 _amount
    )
        public
    {
        _updateFundCpt();
        address payable _sender = msg.sender;
        _coinWithdraw(_sender);
        uint256 _added = _requestOut(_sender, _amount);
        _burn(_sender, _added);
        _updateCredit(_sender, 0);
    }

    function tokenDeposit(
        uint256 _amount
    )
            public
    {
        _updateFundCpt();
        address _sender = msg.sender;
        uint256 _coinBalance = coinOf(_sender);
        ntfToken.transferFrom(_sender, address(this), _amount);
        _mint(_sender, _amount);
        _updateCredit(_sender, _coinBalance);
    }

    function tokenMemberWithdraw(
    )
        public
        notLocking()
    {
        address _sender = msg.sender;
        uint256 _amount = pendingOut[_sender];
        if (_amount > getPoolNtfBalance()) {
            _leave();
            return;
        }
        ntfToken.transfer(_sender, _amount);
        _removeRequest(_sender);
    }

    function coinWithdraw()
        public
    {
        address payable _sender = msg.sender;
        _coinWithdraw(_sender);
    }

    // Read Functions

    // deployed NtfToken contract
    function getPoolNtfBalance()
        public
        view
        returns(uint256)
    {
        return ntfToken.balanceOf(address(this));
    }

    //  CoinShare contract
    // function getCpt() public view returns(uint256)
    // function getFund() public view returns(uint256)
    // function getCoinOf(address _member) public view returns(uint256)

    // Lockable contract
    // function getUnlockTime(address _member) public view returns(uint256)
    // function isLocking(address _member) public view returns(bool)
    // function getLockDuration() public view returns(uint256)

    function getStatus()
        public
        view
        returns(uint256)
    {
        return gov.getStatus(address(this));
    }

    function getPoolGovBalance()
        public
        view
        returns(uint256)
    {
        return gov.getBalance(address(this));
    }

    function getCoinbase()
        public
        view
        returns(address)
    {
        return gov.getCoinbase(address(this));
    }

    function getUnlockHeight()
        public
        view
        returns(uint256)
    {
        return gov.getUnlockHeight(address(this));
    }

    function isWithdrawable()
        external
        view
        returns(bool)
    {
        return gov.isWithdrawable(address(this));
    }

/*
    TEST TEST TEST TEST TEST TEST TEST TEST TEST
*/
    // send nty to contract as Reward from Core
    function virtuellMining()
        public
        payable
    {

    }
}