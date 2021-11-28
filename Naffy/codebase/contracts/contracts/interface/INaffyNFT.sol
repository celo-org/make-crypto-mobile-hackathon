// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface INaffyNFT is IERC721 {
  function mintToken(string memory tokenURI, address creatorAddress) external returns (uint256);
  function mintToken(string memory tokenURI) external returns (uint256);
}