//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma abicoder v2; 

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MobileNFT is ERC721URIStorage, EIP712 {
  string private constant SIGNING_DOMAIN = "MobileNFT";
  string private constant SIGNATURE_VERSION = "1";
  
  using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

  mapping (address => uint256) pendingWithdrawals;

  constructor()
    ERC721("MobileNFT", "MNFT") 
    EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) {
    }

 
  struct NFTVoucher {

    uint256 minPrice;
    string uri;
    bytes signature;
  }

  function redeem(address redeemer, NFTVoucher calldata voucher) public payable returns (uint256) {

    address signer = _verify(voucher);

    require(msg.value >= voucher.minPrice, "Insufficient funds to redeem");

    
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    
    _mint(signer, newItemId);
    _setTokenURI(newItemId, voucher.uri);
    _transfer(signer, redeemer, newItemId);

    pendingWithdrawals[signer] += msg.value;

    return newItemId;
  }


  function withdraw() public {
    address payable receiver = payable(msg.sender);

    uint amount = pendingWithdrawals[receiver];
    pendingWithdrawals[receiver] = 0;
    receiver.transfer(amount);
  }

  function availableToWithdraw(address user) public view returns (uint256) {
    return pendingWithdrawals[user];
  }

  function _hash(NFTVoucher calldata voucher) internal view returns (bytes32) {
    return _hashTypedDataV4(keccak256(abi.encode(
      keccak256("NFTVoucher(uint256 minPrice,string uri)"),
      voucher.minPrice,
      keccak256(bytes(voucher.uri))
    )));
  }

  function getChainID() external view returns (uint256) {
    uint256 id;
    assembly {
        id := chainid()
    }
    return id;
  }

  function _verify(NFTVoucher calldata voucher) internal view returns (address) {
    bytes32 digest = _hash(voucher);
    return ECDSA.recover(digest, voucher.signature);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override (ERC721) returns (bool) {
    return ERC721.supportsInterface(interfaceId);
  }
}