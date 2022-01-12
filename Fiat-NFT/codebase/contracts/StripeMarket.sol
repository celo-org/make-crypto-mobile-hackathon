pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract StripeMarket is ReentrancyGuard{
  using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 public listingPrice = 2 ;

  constructor() {
    owner = payable(msg.sender);
  }
  struct MarketItem {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    string name;
    string tokenUri;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
    bool paid;
  }

  mapping(uint256 => MarketItem) public idToMarketItem;

  event MarketItemCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    string name,
    string tokenUri,
    address seller,
    address owner,
    uint256 price,
    bool sold,
    bool paid
  );

  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }

  function getItemId() public view returns(uint256) {
    uint256 itemId = _itemIds.current();
    return  itemId;
  }
  receive () external payable {}

  function setPaid (uint256 itemId) public {
    idToMarketItem[itemId].paid = true;
  }

  function createItem(
    address nftContract,
    uint256 tokenId,
    uint256 price,
    string memory name
    ) public payable nonReentrant{
    require(price>=1, 'at least more than 1 wei');
    require(msg.value == listingPrice, "listing price not paid");
    string memory tUri = IERC721Metadata(nftContract).tokenURI(tokenId);
    _itemIds.increment();
    uint256 itemId = _itemIds.current();
    MarketItem memory item =  MarketItem(
      itemId,
      nftContract,
      tokenId,
      name,
      tUri,
      payable(msg.sender),
      payable(address(0)),
      price,
      false,
      false
      );
    idToMarketItem[itemId] = item;
    IERC721(nftContract).transferFrom(msg.sender, address(this),tokenId);
    emit MarketItemCreated(
      itemId,
      nftContract,
      tokenId,
      name,
      tUri,
      msg.sender,
      address(0),
      price,
      false,
      false
      );
  }

  function createMarketSale(
  address nftContract,
  address buyer,
  uint256 itemId
  ) public payable nonReentrant{
    uint price = idToMarketItem[itemId].price;
    uint tokenId = idToMarketItem[itemId].tokenId;

    idToMarketItem[itemId].seller.transfer(price);
    IERC721(nftContract).transferFrom(address(this), buyer, tokenId);
    idToMarketItem[itemId].owner = payable(buyer);
    idToMarketItem[itemId].sold = true;
    _itemsSold.increment();
    payable(owner).transfer(listingPrice);
}

  function getItems() public view returns (MarketItem[] memory) {
    uint256 itemId = _itemIds.current();
    MarketItem[] memory items = new MarketItem[](itemId);
    for (uint256 i =0; i<itemId; i++){
      MarketItem memory item = idToMarketItem[i+1];
      items[i] = item;
    }
    return items ;
  }

  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIds.current();
    uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
    uint currentIndex = 0;

    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].owner == address(0)) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function fetchMyNFTs() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function fetchItemsCreated() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
}
