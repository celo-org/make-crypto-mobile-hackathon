pragma solidity ^0.8.2;

import "@openzeppelin/contracts@4.3.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.3.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.3.2/utils/Counters.sol";
import "@openzeppelin/contracts@4.3.2/token/ERC721/extensions/ERC721Enumerable.sol";

contract MyToken is ERC721Enumerable, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  constructor() ERC721("MyToken", "MTK") {}

  function _baseURI() internal pure override returns (string memory) {
    return "https://google.com/";
  }

  function safeMint(address to) public onlyOwner {
    _safeMint(to, _tokenIdCounter.current());
    _tokenIdCounter.increment();
  }
}
