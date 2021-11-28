// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./RedstoneCoreProxy.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol";

/**
 * @dev This contract implements an upgradeable proxy. It is upgradeable because calls are delegated to an
 * implementation address that can be changed. This address is stored in storage in the location specified by
 * https://eips.ethereum.org/EIPS/eip-1967[EIP1967], so that it doesn't conflict with the storage layout of the
 * implementation behind the proxy.
 */

contract RedstoneProxy is RedstoneCoreProxy, ERC1967Upgrade {
    // Note! We cannot add non-constant fields to this contract
    // Because they would override the fields from the proxied contract
    // It happens because EVM identifies them based on types and order (not their names)
   
    // We follow the EIP-1967 stanard for Proxy Storage Slots
    // Learn more: https://eips.ethereum.org/EIPS/eip-1967
    bytes32 constant _PRICE_FEED_SLOT  = bytes32(uint256(keccak256("redstone.price_feed.implementation")) - 1);
    
    
    /**
     * @dev Initializes the upgradeable proxy with an initial implementation specified by `_logic`.
     *
     * If `_data` is nonempty, it's used as data in a delegate call to `_logic`. This will typically be an encoded
     * function call, and allows initializating the storage of the proxy like a Solidity constructor.
     */
    constructor(address _logic, address _priceFeedAddress, bytes memory _data) payable {
        _setPriceFeed(_priceFeedAddress);
        _upgradeToAndCall(_logic, _data, false);
    }
    

    /**
     * @dev Returns the current implementation address.
     */
    function _implementation() internal view virtual override returns (address impl) {
        return ERC1967Upgrade._getImplementation();
    }
    

    /**
     * @dev Returns the current price feed address
     */
    function _priceFeed() internal view override returns (address) {
        return StorageSlot.getAddressSlot(_PRICE_FEED_SLOT).value;
    }

    
    function _setPriceFeed(address _priceFeedAddress) private {
        require(_priceFeedAddress != address(0), "Price feed address cannot be empty");
        
        assert(_IMPLEMENTATION_SLOT == bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1));
        StorageSlot.getAddressSlot(_PRICE_FEED_SLOT).value = _priceFeedAddress;
    }

    /**
     * @dev Sets the price feed address (internal function)
     */
    function setPriceFeed(address _priceFeedAddress) external {
        require(msg.sender == _getAdmin(), "Only admin can set price feed");
        _setPriceFeed(_priceFeedAddress);
    }
}
