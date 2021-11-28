// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./interface/INaffyNFT.sol";

contract Creator {
  uint256 public lastSupporterId = 0;
  uint256 public lastActivityId = 0;
  uint256 public lastNftItemId = 0;
  address public owner;
  IERC20 cusd;
  IERC20 ceur;

  enum Token {
    CELO,
    CUSD,
    CEUR,
    NFT
  }

  enum Action {
    SUPPORT,
    WITHDRAW,
    MINT
  }

  mapping(address => uint256) addressToSupporterId;
  mapping(Token => uint256) public balances;
  mapping(uint256 => Activity) public activities;
  mapping(uint256 => Supporter) public supporters;
  mapping(uint256 => NFTItem) public nfts;
  mapping(uint256 => mapping(address => uint256)) public nftItemIds;

  struct NFTItem {
    address contractAddress;
    uint256 tokenId;
    uint256 price;
    address owner;
    bool isForSale;
    bool isSold;
  }

  struct Supporter {
    address supporterAddress;
    mapping(Token => uint256) contributions;
  }

  struct Activity {
    address actor;
    uint256 value;
    Action action;
    Token token;
    address contractAddress;
    bool isNFT;
  }

  using SafeMath for uint256;

  constructor(
    address _owner,
    address _cusd,
    address _ceur
  ) {
    owner = _owner;
    cusd = IERC20(_cusd);
    ceur = IERC20(_ceur);

    // set initial token Balances to 0
    balances[Token.CELO] = 0;
    balances[Token.CUSD] = 0;
    balances[Token.CEUR] = 0;
  }

  function _addSupporter(
    address _supporter,
    Token _token,
    uint256 _value
  ) internal {
    lastSupporterId++;
    supporters[lastSupporterId].supporterAddress = _supporter;
    supporters[lastSupporterId].contributions[_token] = supporters[lastSupporterId].contributions[_token].add(_value);

    addressToSupporterId[_supporter] = lastSupporterId;
  }

  function _addNftItem(
    address _nftContract,
    uint256 _tokenId,
    address _owner
  ) internal {
    lastNftItemId++;

    nftItemIds[_tokenId][_nftContract] = lastNftItemId;
    nfts[lastNftItemId] = NFTItem(_nftContract, _tokenId, 0, _owner, false, false);
  }

  function _updateSupporter(
    uint256 _id,
    Token _token,
    uint256 _value
  ) internal {
    supporters[_id].contributions[_token] = supporters[_id].contributions[_token].add(_value);
  }

  function _addBalance(Token _token, uint256 _value) internal {
    balances[_token] = balances[_token].add(_value);
  }

  function _subBalance(Token _token, uint256 _value) internal {
    balances[_token] = balances[_token].sub(_value);
  }

  function _addActivity(
    address _actor,
    uint256 _value,
    Action _action,
    Token _token,
    address _contractAddress,
    bool _isNFT
  ) internal {
    lastActivityId++;
    activities[lastActivityId] = Activity(_actor, _value, _action, _token, _contractAddress, _isNFT);
  }

  modifier onlyOwner() {
    require(owner == msg.sender, "Naffy: caller is not the creator");
    _;
  }

  function supportWithCelo() public payable {
    uint256 _id = addressToSupporterId[msg.sender];

    if (_id == 0) {
      _addSupporter(msg.sender, Token.CELO, msg.value);
    } else {
      _updateSupporter(_id, Token.CELO, msg.value);
    }

    _addBalance(Token.CELO, msg.value);
    _addActivity(msg.sender, msg.value, Action.SUPPORT, Token.CELO, address(0), false);
  }

  function supportWithToken(uint256 _amount, Token _token) public {
    if (_token == Token.CUSD) {
      require(cusd.allowance(msg.sender, address(this)) >= _amount, "Naffy: cUSD Allowance not enough");
      require(cusd.transferFrom(msg.sender, address(this), _amount), "Naffy: An error occured when supporting creator");
    } else if (_token == Token.CEUR) {
      require(ceur.allowance(msg.sender, address(this)) >= _amount, "Naffy: cEUR Allowance not enough");
      require(ceur.transferFrom(msg.sender, address(this), _amount), "Naffy: An error occured when supporting creator");
    } else {
      revert("Naffy: Invalid support token");
    }

    uint256 _id = addressToSupporterId[msg.sender];
    if (_id == 0) {
      _addSupporter(msg.sender, _token, _amount);
    } else {
      _updateSupporter(_id, _token, _amount);
    }

    _addBalance(_token, _amount);
    _addActivity(msg.sender, _amount, Action.SUPPORT, _token, address(0), false);
  }

  function withdrawToken(uint256 _amount, Token _token) public onlyOwner {
    require(_amount <= balances[_token], "Naffy: Insufficient balance");

    if (_token == Token.CELO) {
      payable(owner).transfer(_amount);
    } else if (_token == Token.CUSD) {
      cusd.transfer(owner, _amount);
    } else if (_token == Token.CEUR) {
      ceur.transfer(owner, _amount);
    } else {
      revert("Naffy: Invalid support token");
    }

    _subBalance(_token, _amount);
    _addActivity(msg.sender, _amount, Action.WITHDRAW, _token, address(0), false);
  }

  function supportWithNFT(uint256 _tokenId, address _nftContract) public {
    IERC721 nft = IERC721(_nftContract);
    require(nft.ownerOf(_tokenId) == msg.sender, "Naffy: You do not own NFT Item");
    require(nft.isApprovedForAll(msg.sender, address(this)) || nft.getApproved(_tokenId) == address(this), "Naffy: NFT Item is not approved");

    nft.safeTransferFrom(msg.sender, address(this), _tokenId);

    uint256 _id = addressToSupporterId[msg.sender];
    if (_id == 0) {
      _addSupporter(msg.sender, Token.NFT, 0);
    } else {
      _updateSupporter(_id, Token.NFT, 0);
    }

    _addNftItem(_nftContract, _tokenId, address(this));
    _addActivity(msg.sender, 0, Action.SUPPORT, Token.NFT, _nftContract, true);
  }

  function listNFT(
    uint256 _tokenId,
    address _nftContract,
    uint256 _price
  ) public onlyOwner {
    IERC721 nft = IERC721(_nftContract);
    require(nft.ownerOf(_tokenId) == msg.sender || nft.ownerOf(_tokenId) == address(this), "Naffy: You do not own NFT Item");

    uint256 _nftItemId = nftItemIds[_tokenId][_nftContract];
    NFTItem storage item = nfts[_nftItemId];

    require(item.contractAddress != address(0), "Naffy: Invalid NFT Item");
    require(item.owner == msg.sender || item.owner == address(this), "Naffy: You do not own NFT Item");
    require(!item.isForSale, "Naffy: NFT is already listed for sale");

    item.isForSale = true;
    item.price = _price;
  }

  function unListNFT(uint256 _tokenId, address _nftContract) public onlyOwner {
    IERC721 nft = IERC721(_nftContract);
    require(nft.ownerOf(_tokenId) == msg.sender || nft.ownerOf(_tokenId) == address(this), "Naffy: You do not own NFT Item");

    uint256 _nftItemId = nftItemIds[_tokenId][_nftContract];
    NFTItem storage item = nfts[_nftItemId];

    require(item.contractAddress != address(0), "Naffy: Invalid NFT Item");
    require(item.owner == msg.sender || item.owner == address(this), "Naffy: You do not own NFT Item");
    require(item.isForSale, "Naffy: NFT is not already listed for sale");

    item.isForSale = false;
    item.price = 0;
  }

  function buyNFTItem(uint256 _tokenId, address _nftContract) public payable {
    IERC721 nft = IERC721(_nftContract);
    require(nft.ownerOf(_tokenId) != msg.sender, "Naffy: You already own NFT Item");
    require(nft.ownerOf(_tokenId) == address(this), "Naffy: Creator does not own NFT Item");

    uint256 _nftItemId = nftItemIds[_tokenId][_nftContract];
    NFTItem storage item = nfts[_nftItemId];

    require(item.contractAddress != address(0), "Naffy: Invalid NFT Item");
    require(item.isForSale, "Naffy: NFT is not for sale");
    require(msg.value >= item.price, "Naffy: Invalid price");

    nft.safeTransferFrom(address(this), msg.sender, _tokenId);
    _addBalance(Token.CELO, msg.value);

    item.isForSale = false;
    item.isSold = true;
    item.owner = msg.sender;
    item.price = 0;
  }

  function transferNFTItem(uint256 _tokenId, address _nftContract, address _to) public onlyOwner {
    IERC721 nft = IERC721(_nftContract);
    require(nft.ownerOf(_tokenId) == address(this), "Naffy: Creator does not own NFT Item");

    uint256 _nftItemId = nftItemIds[_tokenId][_nftContract];
    NFTItem storage item = nfts[_nftItemId];
    
    require(item.contractAddress != address(0), "Naffy: Invalid NFT Item");
    nft.safeTransferFrom(address(this), _to, _tokenId);

    item.owner = _to;
  }

  function getNFTCount() public view returns (uint256) {
    return lastNftItemId;
  }

  function getNFTItemId(uint256 _tokenId, address _nftContract) public view returns (uint256) {
    return nftItemIds[_tokenId][_nftContract];
  }

  function onERC721Received(
    address,
    address,
    uint256,
    bytes calldata
  ) external pure returns (bytes4) {
    return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
  }

  function balance(Token _token) public view returns (uint256) {
    return balances[_token];
  }

  function addr() public view returns (address) {
    return address(this);
  }

  function getDetails()
    public
    view
    returns (
      address,
      address,
      uint256,
      uint256,
      uint256
    )
  {
    return (owner, address(this), balances[Token.CELO], balances[Token.CUSD], balances[Token.CEUR]);
  }
}
