//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import "hardhat/console.sol";
import "./ERC20Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "redstone-flash-storage/lib/contracts/message-based/PriceAware.sol";

contract KoTokenCELO is ERC20Initializable, Ownable, PriceAware {

    bool private initialized;
    bytes32 public asset;
    address public broker;

    uint256 constant public MAX_SOLVENCY = 2**256 - 1;
    bytes32 constant public COLLATERAL_TOKEN  = "CELO"; 
    uint256 constant public SOLVENCY_PRECISION  = 1000; // 100%, 1 unit = 0.1% 
    uint256 constant public MIN_SOLVENCY  = 1200; // 120%, 1 unit = 0.1% 
    uint256 constant public LIQUIDATION_BONUS = 50; // 5%, 1 unit = 0.1% 

    mapping(address => uint256) public collateral;
    mapping(address => uint256) public debt;   

    function initialize(bytes32 asset_, string memory name_, string memory symbol_) external {
        require(!initialized);

        super.initialize(name_, symbol_);
        
        asset = asset_;
        
        initialized = true;
    }

    /**
     * @dev Mints koTokens increasing user's debt
     */
    function mint(uint256 amount) payable external remainsSolvent {
        super._mint(msg.sender, amount);
        debt[msg.sender] += amount;
        addCollateral();
    }

    /**
     * @dev Burns koTokens to reduce user debt
     */
    function burn(uint256 amount) external {
        require(debt[msg.sender] >= amount, "Cannot burn more than minted");
        debt[msg.sender] -= amount;
        super._burn(msg.sender, amount);
    }


    /**
     * @dev Adds collateral to user account
     * It could be done to increase the solvency ratio
     */
    function addCollateral() payable virtual public {
        collateral[msg.sender] += msg.value;
        emit CollateralAdded(msg.sender, msg.value, block.timestamp);
    }


    /**
     * @dev Removes outstanding collateral by paying out funds to depositor
     * The account must remain solvent after the operation
     */
    function removeCollateral(uint amount) virtual external remainsSolvent {
        require(collateral[msg.sender] >= amount, "Cannot remove more collateral than deposited");
        collateral[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit CollateralRemoved(msg.sender, amount, block.timestamp);
    }


    /**
     * @dev Collateral amount expressed in CELO
     */
    function collateralOf(address account) public virtual view returns(uint256) {
        return collateral[account];
    }


    /**
     * @dev Collateral value expressed in USD
     */
    function collateralValueOf(address account) public view returns(uint256) {
        return collateralOf(account) * getPriceFromMsg(COLLATERAL_TOKEN);
    }


    /**
     * @dev Debt of the account (number of koTokens minted)
     */
    function debtOf(address account) public view returns(uint256) {
        return debt[account];
    }


    /**
     * @dev Debt of the account expressed in USD
     */
    function debtValueOf(address account) public view returns(uint256) {
        return debt[account] * getPriceFromMsg(asset);
    }


    /**
     * @dev A ratio between the value of collateral and debt of the account
     * It's expressed in permills - 0.1% (ratio 1 to 1 is equal to 1000 units)
     * To leave a margin for price movement and liquidation it must remain safely abot 1000 
     */
    function solvencyOf(address account) public view returns(uint256) {
        if (debtValueOf(account) == 0) {
            return MAX_SOLVENCY;
        } else {
            return collateralValueOf(account) * SOLVENCY_PRECISION / debtValueOf(account);
        }
    }


    /**
     * @dev Value of komodo tokens held by given account at the current market price
     */
    function balanceValueOf(address account) public view returns(uint256) {
        return balanceOf(account) * getPriceFromMsg(asset); 
    }


    /**
     * @dev Total value of all minted komodo tokens at the current market price
     */
    function totalValue() public view returns(uint256) {
        return totalSupply() * getPriceFromMsg(asset);
    }


    function liquidate(address account, uint256 amount) public {
        require(solvencyOf(account) < MIN_SOLVENCY, "Cannot liquidate a solvent account");
        this.transferFrom(msg.sender, account, amount);
        super._burn(account, amount);
        debt[account] -= amount;

        // Liquidator reward
        uint256 collateralRepayment = amount * getPriceFromMsg(asset) / getPriceFromMsg(COLLATERAL_TOKEN);
        uint256 bonus = collateralRepayment * LIQUIDATION_BONUS / SOLVENCY_PRECISION;

        uint256 repaymentWithBonus = collateralRepayment + bonus;
        collateral[account] -= repaymentWithBonus;
        payable(msg.sender).transfer(repaymentWithBonus);

        require(solvencyOf(account) >= MIN_SOLVENCY, "Account must be solvent after liquidation");
    }

    modifier remainsSolvent() {
        _;
        require(solvencyOf(msg.sender) >= MIN_SOLVENCY, "The account must remain solvent");
    }


    // EVENTS
    event CollateralAdded(address account, uint256 val, uint256 time);
    event CollateralRemoved(address account, uint256 val, uint256 time);

}
