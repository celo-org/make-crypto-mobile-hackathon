// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Creator.sol";

contract NFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) _tokenURIs;
    mapping(uint256 => uint256) public _royalties;
    mapping(uint256 => address) public _royaltyReceiver;

    constructor(string memory collectionName, string memory collectionSymbol)
        ERC721(collectionName, collectionSymbol)
    {}

    function createToken(string memory _tokenURI, uint256 royaltyPercentage)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _tokenURIs[newItemId] = _tokenURI;
        _royalties[newItemId] = royaltyPercentage;
        _royaltyReceiver[newItemId] = msg.sender;
        return newItemId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return _tokenURIs[tokenId];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override
        returns (bool)
    {
        return ERC721Enumerable.supportsInterface(interfaceId);
    }

    function isApprovedToMarketplace(address spender, uint256 tokenId)
        public
        view
        returns (bool)
    {
        return _isApprovedOrOwner(spender, tokenId);
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function getRoyaltyPercentage(uint256 tokenId)
        external
        view
        returns (uint256)
    {
        return _royalties[tokenId];
    }

    function getRoyaltyReceiver(uint256 tokenId)
        external
        view
        returns (address)
    {
        return _royaltyReceiver[tokenId];
    }

    receive() external payable {}
}
