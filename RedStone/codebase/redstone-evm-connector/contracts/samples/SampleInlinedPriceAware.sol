// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;


import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title SampleInlinedPriceAware
 * @dev An example of a contract using message-based way of fetching data from RedStone
 * It has only a few dummy methods used to benchmark gas consumption
 * It extends InlinedPriceAware which in-lines signer address and maximum delay of price feed
 * to reduce the gas of every invocation (saving is ~4k gas)
 */
contract SampleInlinedPriceAware  {
  using ECDSA for bytes32;

  uint constant MAX_DELAY = 3 * 60;
  address constant TRUSTED_SIGNER = 0x926E370fD53c23f8B71ad2B3217b227E41A92b12;

  
  function executeWithPrice(bytes32 symbol) public returns(uint256) {
    return getPriceFromMsg(symbol);
  }
  

  function getPriceFromMsg(bytes32 symbol) internal view returns(uint256) {
    //The structure of calldata witn n - data items:
    //The data that is signed (symbols, values, timestamp) are inside the {} brackets
    //[origina_call_data| ?]{[[symbol | 32][value | 32] | n times][timestamp | 32]}[size | 1][signature | 65]


    //1. First we extract dataSize - the number of data items (symbol,value pairs) in the message
    uint8 dataSize; //Number of data entries    
    assembly {
    //Calldataload loads slots of 32 bytes
    //The last 65 bytes are for signature
    //We load the previous 32 bytes and automatically take the 2 least significant ones (casting to uint16)
      dataSize := calldataload(sub(calldatasize(), 97))
    }


    // 2. We calculate the size of signable message expressed in bytes
    // ((symbolLen(32) + valueLen(32)) * dataSize + timeStamp length
    uint16 messageLength = dataSize * 64 + 32; //Length of data message in bytes


    // 3. We extract the signableMessage

    //(That's the high level equivalent 2k gas more expensive)
    //bytes memory rawData = msg.data.slice(msg.data.length - messageLength - 65, messageLength);

    bytes memory signableMessage;
    assembly {
      signableMessage := mload(0x40)
      mstore(signableMessage, messageLength)
    //The starting point is callDataSize minus length of data(messageLength), signature(65) and size(1) = 66
      calldatacopy(add(signableMessage, 0x20), sub(calldatasize(), add(messageLength, 66)), messageLength)
      mstore(0x40, add(signableMessage, 0x20))
    }


    // 4. We first hash the raw message and then hash it again with the prefix
    // Following the https://github.com/ethereum/eips/issues/191 standard
    bytes32 hash = keccak256(signableMessage);
    bytes32 hashWithPrefix = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));

    // 5. We extract the off-chain signature from calldata

    //(That's the high level equivalent 2k gas more expensive)
    //bytes memory signature = msg.data.slice(msg.data.length - 65, 65);
    bytes memory signature;
    assembly {
      signature := mload(0x40)
      mstore(signature, 65)
      calldatacopy(add(signature, 0x20), sub(calldatasize(), 65), 65)
      mstore(0x40, add(signature, 0x20))
    }

    // 6. We verify the off-chain signature against on-chain hashed data

    address signer = hashWithPrefix.recover(signature);
    require(signer == TRUSTED_SIGNER, "Signer not authorized");

    //7. We extract timestamp from callData

    uint256 dataTimestamp;
    assembly {
    //Calldataload loads slots of 32 bytes
    //The last 65 bytes are for signature + 1 for data size
    //We load the previous 32 bytes
      dataTimestamp := calldataload(sub(calldatasize(), 98))
    }
    require(block.timestamp - dataTimestamp < MAX_DELAY, "Data is too old");

    //8. We iterate directly through call data to extract the value for a given symbol

    uint256 val;
    uint256 max = dataSize;
    bytes32 currentSymbol;
    uint256 i;
    assembly {
      let start := sub(calldatasize(), add(messageLength, 66))
      for { i := 0 } lt(i, max) { i := add(i, 1) } {
        currentSymbol := calldataload(add(start, mul(i, 64)))
        if eq(currentSymbol, symbol) {
           val := calldataload(add(start, add(32, mul(i, 64))))
           i := max
        }
      }
    }

    return val;
  }

}

