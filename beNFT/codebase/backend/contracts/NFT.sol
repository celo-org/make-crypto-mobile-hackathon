// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    // to make NFT ids unique
    Counters.Counter private _tokenIds;

    constructor() ERC721("Benefi Tokens", "BENEFI") {
    }

    function createToken(string memory tokenURI, address marketplaceAddress) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        // give the marketplace the authorization to make transactions with this token in another contract
        setApprovalForAll(marketplaceAddress, true);
        return newItemId;
    }

}
