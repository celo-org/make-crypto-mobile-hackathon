// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Nftzi is ERC721 {
    struct RentalStruct{
        uint256 rentedAt;
        uint256 tokenId;
        address rentedBy;
    }

    struct TokenInfoStruct{
        uint256 tokenId;
        string URI;
        address creator;
        uint256 rentedAt;
        address rentedBy;
        uint256 balance;
    }

    using Counters for Counters.Counter;

    uint256 public rentPriceCelo = 1 ether;
    uint256 public _comission = 0.01 ether;

    uint256 private _lastRun;
    uint256[] private rentedSeq;

    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _seqCounter;

    mapping (uint256 => string) private _tokenURIs;
    mapping (uint256 => address) private _tokenCreators;
    mapping (uint256 => uint256) private _balances;
    mapping (uint256 => address) private _tokenCurrencies;
    mapping (uint256 => RentalStruct) private _rentedAt;
    mapping (uint256 => uint256) private _tokenToSeq;

    constructor() ERC721("Nftzi", "NFTZ") {
        _lastRun = block.timestamp;
        _tokenIdCounter.increment();
        _seqCounter.increment();
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual override returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address creator = _tokenCreators[tokenId];
        return (spender == creator);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set for nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
        
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }

    function tokensInfo() public view returns(TokenInfoStruct[] memory) {
        TokenInfoStruct[] memory _toReturn;
        uint256 lastTokenId = _tokenIdCounter.current();
        if (lastTokenId > 0) {
            _toReturn = new TokenInfoStruct[](lastTokenId);
            for (uint i = 1; i < lastTokenId; i++) {
                _toReturn[i] = TokenInfoStruct(
                  i,
                  _tokenURIs[i],
                  _tokenCreators[i],
                  _rentedAt[_tokenToSeq[i]].rentedAt,
                  _rentedAt[_tokenToSeq[i]].rentedBy,
                  _balances[i]
                );
            }
        }
        return _toReturn;
    }

    function rent(uint256 tokenId) public {
        require(_exists(tokenId), "ERC721: rent query for nonexistent token");

        ERC20 token = ERC20(_tokenCurrencies[tokenId]);
        require(token.balanceOf(msg.sender) >= rentPriceCelo);
        token.transferFrom(msg.sender, address(this), rentPriceCelo);

        _balances[tokenId] += rentPriceCelo - _comission;
        uint256 currentSeq = _seqCounter.current();
        _rentedAt[currentSeq] = RentalStruct(block.timestamp, tokenId, msg.sender);
        _safeTransfer(_tokenCreators[tokenId], msg.sender, tokenId, "");
        rentedSeq.push(currentSeq);
        _tokenToSeq[tokenId] = currentSeq;
        _seqCounter.increment();
    }

    function _tick() internal virtual {
        _lastRun = block.timestamp;
        _checkReturns();
    }

    function _checkReturns() internal virtual {
        uint256[] memory _toReturn = new uint256[](rentedSeq.length);
        for (uint i = 0; i < rentedSeq.length ; i++) {
            RentalStruct memory _rentInfo = _rentedAt[rentedSeq[i]];
            if (_lastRun - _rentInfo.rentedAt < 1 minutes) {
                break;
            } else {
                _toReturn[i] = rentedSeq[i];
            }
        }
        for (uint i = 0; i < _toReturn.length; i++) {
            if (_toReturn[i] > 0) {
                RentalStruct memory _rentInfo = _rentedAt[_toReturn[i]];
                _returnRented(_rentInfo.tokenId, _rentInfo.rentedBy);
                delete _rentedAt[_toReturn[i]];
                delete rentedSeq[0];
                delete _tokenToSeq[_toReturn[i]];
            }
        }
    }

    function _returnRented(uint256 tokenId, address rentedBy) internal virtual {
        ERC20 token = ERC20(_tokenCurrencies[tokenId]);
        require(token.balanceOf(address(this)) >= _balances[tokenId]);
        token.transfer(_tokenCreators[tokenId], _balances[tokenId]);

        _balances[tokenId] -= _balances[tokenId];

        _safeTransfer(rentedBy, _tokenCreators[tokenId], tokenId, "");
    }

    function redeem(uint256 tokenId) public {
        _lastRun = block.timestamp;

        require(_exists(tokenId), "ERC721: rent query for nonexistent token");
        require(msg.sender == _tokenCreators[tokenId], "Redeem: caller is not the creator");

        uint256 _toRedeemPart = _balances[tokenId] / 1 minutes;
        uint256 _toRedeemSeconds = _lastRun - _rentedAt[_tokenToSeq[tokenId]].rentedAt;
        uint256 _toRedeem = _toRedeemPart * _toRedeemSeconds;

        ERC20 token = ERC20(_tokenCurrencies[tokenId]);
        require(token.balanceOf(address(this)) >= _toRedeem);

        token.transfer(_tokenCreators[tokenId], _toRedeem);
        _balances[tokenId] -= _toRedeem;
    }

    function safeMint(string memory _tokenURI, address rent_token_address) external {
        _tick();
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_msgSender(), tokenId);
        _setTokenURI(tokenId, _tokenURI);
        _tokenCreators[tokenId] = _msgSender();
        _tokenCurrencies[tokenId] = rent_token_address;
    }
}
