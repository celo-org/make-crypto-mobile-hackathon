pragma solidity ^0.8.3;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
contract KenulinCoin is ERC20,AccessControl  {
    bytes32 public constant BURNER_ROLE = keccak256("MINTER_ROLE");
    address private developer = 0xE7d71E37aA955474f4aE7952Caf4bDdeE30aB3f0;
    constructor() ERC20("Kenulin Coin", "KLC") {
        _setupRole(BURNER_ROLE, msg.sender);
        _mint(msg.sender,100000000*10**18);
    }
    function burn(uint256 amount) public {
        require(hasRole(BURNER_ROLE, msg.sender), "Caller is not a minter");
        burn(amount);
    }
}