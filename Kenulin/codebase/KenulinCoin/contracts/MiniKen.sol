pragma solidity ^0.8.3;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MiniKen is ERC721URIStorage,Ownable  {
    using SafeMath for uint256;
    using Strings for string;
    address payable private nftDeveloper = payable(0xE7d71E37aA955474f4aE7952Caf4bDdeE30aB3f0);
    constructor() ERC721("MiniKen", "MNK") {

    }
    struct Character {
        uint256 strength;
        uint256 intellegence;
        uint256 dexterity;
        uint256 hp;
        uint256 civ;
        uint256 experience;
        string name;
        string uri;
    }
    Character[] public characters;
    function openBox(
        uint256 strength,
        uint256 intellegence,
        uint256 dexterity,
        uint256 hp,
        uint256 civ,
        uint256 experience,
        string memory name,
        string memory uri
    ) public payable{
        require(msg.value >= 100*10**18,"insufficient balance");
        nftDeveloper.transfer(msg.value);
        characters.push(Character(
            strength,
            intellegence,
            dexterity,
            hp,
            civ,
            experience,
            name,
            uri
        ));
        uint256 newId = characters.length;
        _safeMint(msg.sender, newId);
        _setTokenURI(newId, uri);
    }
    function totalSupply()public returns (uint256) {
        return characters.length;
    }
    function getDetailStats(uint256 id) public returns (uint256,uint256,uint256,uint256,uint256,uint256){
        return (
                characters[id].strength,
                characters[id].intellegence,
                characters[id].dexterity,
                characters[id].hp,
                characters[id].civ,
                characters[id].experience
        );
    }
}
