//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import "hardhat/console.sol";
import "./ERC20Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "redstone-flash-storage/lib/contracts/message-based/PriceAware.sol";


contract KoTokenCUSD is ERC20Initializable, Ownable, PriceAware {

    bool private initialized;
    bytes32 public asset;
    ERC20 public usd;
    address public broker;

    uint256 constant public MAX_SOLVENCY = 2**256 - 1;
    uint256 constant public SOLVENCY_PRECISION  = 1000; // 100%, 1 unit = 0.1% 
    uint256 constant public MIN_SOLVENCY  = 1200; // 120%, 1 unit = 0.1% 
    uint256 constant public LIQUIDATION_BONUS = 50; // 5%, 1 unit = 0.1% 

    mapping(address => uint256) public collateral;
    mapping(address => uint256) public debt;

    function initialize(bytes32 asset_, ERC20 cusd_, string memory name_, string memory symbol_) external {
        require(!initialized);

        super.initialize(name_, symbol_);

        asset = asset_;
        usd = cusd_;

        initialized = true;
    }


    /**
     * @dev Mints koTokens increasing user's debt
     */
    function mint(uint256 amount, uint256 collateralAmount) remainsSolvent external {
        super._mint(msg.sender, amount);
        debt[msg.sender] += amount;
        
        addCollateral(collateralAmount);
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
    function addCollateral(uint256 collateralAmount) virtual public {
        collateral[msg.sender] += collateralAmount;
        usd.transferFrom(msg.sender, address(this), collateralAmount);
        
        emit CollateralAdded(msg.sender, collateralAmount, block.timestamp);
    }


    /**
     * @dev Removes outstanding collateral by paying out funds to depositor
     * The account must remain solvent after the operation
     */
    function removeCollateral(uint amount) virtual public remainsSolvent {
        require(collateral[msg.sender] >= amount, "Cannot remove more collateral than deposited");
        collateral[msg.sender] -= amount;
        usd.transfer(msg.sender, amount);
        emit CollateralRemoved(msg.sender, amount, block.timestamp);
    }


    /**
     * @dev Collateral amount in cUSD stable coins
     */
    function collateralOf(address account) public view returns(uint256) {
        return collateral[account];
    }


    /**
     * @dev Collateral value in USD with 10*26 precision
     * 26 = 18 (default token precision on Celo) + 8 (redstone usd values precision)
     */
    function collateralValueOf(address account) public view returns(uint256) {
        return collateralOf(account) * 10 ** 8;
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

        //Liquidator reward
        uint256 collateralRepayment = amount * getPriceFromMsg(asset);
        uint256 bonus = collateralRepayment * LIQUIDATION_BONUS / SOLVENCY_PRECISION;

        uint256 repaymentWithBonus = collateralRepayment + bonus;
        collateral[account] -= repaymentWithBonus;
        usd.transfer(msg.sender, repaymentWithBonus);

        require(solvencyOf(account) >= MIN_SOLVENCY, "Account must be solvent after liquidation");
    }

    modifier remainsSolvent() {
        _;
        require(solvencyOf(msg.sender) >= MIN_SOLVENCY, "The account must remain solvent");
    }

    //EVENTS

    event CollateralAdded(address account, uint256 val, uint256 time);
    event CollateralRemoved(address account, uint256 val, uint256 time);

}
