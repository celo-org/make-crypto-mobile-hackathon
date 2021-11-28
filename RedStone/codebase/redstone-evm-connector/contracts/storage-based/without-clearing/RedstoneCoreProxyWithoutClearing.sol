// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "../../commons/BytesLib.sol";
import '../../commons/PriceFeed.sol';
import "@openzeppelin/contracts/proxy/Proxy.sol";

abstract contract RedstoneCoreProxyWithoutClearing is Proxy {
    using BytesLib for bytes;

    bytes32 constant MARKER = keccak256("Redstone.version.0.0.1");
    uint8 constant MARKER_SLOT_SIZE = 32;
    uint8 constant LEN_SLOT_SIZE = 2;

    /**
     * @dev Delegates the current call to `implementation`.
     *
     * It extracts the pricing data and keep it in the storage of priceFeed contract. 
     * Then it forwards the call to the implementation recording the results. 
     * As the last step it cleans the data from priceFeed to save on gas fees
     * and forwards the results to the caller.
     */
    function _delegate(address implementation) internal override {

        // Check if transaction contains Redstone marker
        bool isTxWithPricing = false;
        if (msg.data.length > MARKER_SLOT_SIZE) {
            isTxWithPricing = msg.data.toBytes32(msg.data.length - MARKER_SLOT_SIZE) == MARKER;
        }


        // Register price data
        bytes memory priceData;
        uint16 priceDataLen;
        uint16 markerAndLenOffset = (MARKER_SLOT_SIZE + LEN_SLOT_SIZE);
        if (isTxWithPricing) {
            priceDataLen = msg.data.toUint16(msg.data.length - markerAndLenOffset);
            priceData = msg.data.slice(msg.data.length - priceDataLen - markerAndLenOffset, priceDataLen);
            (bool success,) = _priceFeed().call(priceData);
            require(success, "Error setting price data");
        }

        // Copied from openzeppelin github repo
        // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/Proxy.sol
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }


    /**
     * @dev This is a virtual function that should be overriden
     * to return the address of the contract which keeps the prices on-chain
     */
    function _priceFeed() internal view virtual returns (address);

}
