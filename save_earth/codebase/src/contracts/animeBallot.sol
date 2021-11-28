// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.7;

// This external contract is used mainly to approve funds that helps with transferring celo
interface IERC20Token {
    function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

// my contract starts here

// experimenting on some things here for another project
// I will be glad if you can improvise it optimally for your own use
// don't forget to show me ヾ(^▽^*)))

contract AnimeRecomendation {
    // this creates the structure for our Voters and Anime similar to class in OOP
    struct Voter {
        address address_;
        string animeName;
        bool hasVoted;
        uint voteWeight;
    }
    
    struct Anime {
        string name;
        string image;
        string link;
        string description;
        uint voteCount;
        uint group;

    }

    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1; // this address is used for celo transaction with the interface contract
    
    Anime [] public animes_; // array for where we keep our animes, with the Anime Struct

    mapping (address => Voter) internal voter_;

    Voter [] public voters;

    uint internal groupNum; // automatically starts at zero

    uint internal cost = 2e10; // the cost of 2cUSD or 2e10 or 2e18, we use 2e10 instead of 2e18 because of testnet block approval takes long

    uint public totalVoteCount; // track how much we will pay out

    uint contractStartAt = block.timestamp;

    bool public isThereWinner;

    // to return current group
    uint atGrpNum = 0;
    Anime [] internal currentAnimesGrp_; // track current voting group 


    Anime public previousAnimesGrp_; // display prev. winner on frontend

    address internal currentWinner; // to track current winner and for payment

    address public previousWinner; // saves the prev. winner for the frontend

    address internal creator; // only the creator or me (a watcher) can pay out

    function createAnimeList(string[][] memory animeNames) public {
        // careful with multi-dimensional arr, using ('' or ``) as input can cause error, use (") instead
        // [["Bayo", "bayo.png", "https://yo.tub2.link", "description"], ["adeBayo", "adebayo.png", "https://yo.tub2.link", "description"]]
{        
        // [["Bleach", "https://i.pinimg.com/564x/27/37/d5/2737d596dba5d17bcae329807f7c3570.jpg", "https://www.youtube.com/watch?v=oZ67d9XSjFs", "Ichigo Kurosaki never asked for the ability to see ghosts -- he was born with the gift. When his family is attacked by a Hollow -- a malevolent lost soul -- Ichigo becomes a Soul Reaper, dedicating his life to protecting the innocent and helping the tortured spirits themselves find peace"],
        // ["Naruto", "https://i.pinimg.com/564x/d6/ca/b3/d6cab3d7ce263fbd44a6e190058ada84.jpg", "https://www.youtube.com/watch?v=mksl3tYdyK4", "Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village"], 
        // ["One Piece", "https://i.pinimg.com/564x/73/08/6a/73086a49da74704f945eff83dab20af2.jpg", "https://www.youtube.com/watch?v=S8_YwFLCh4U", "Monkey D. Luffy, a young man who, inspired by his childhood idol and powerful pirate "Red Haired" Shanks, sets off on a journey from the East Blue Sea to find the titular treasure and proclaim himself the King of the Pirates. In an effort to organize his own crew, the Straw Hat Pirates"]]
}
        voter_[msg.sender].voteWeight = 10; // ensures that our creator can't vote

        for (uint8 i = 0; i < animeNames.length; i++) {
            animes_.push(Anime({
                name: animeNames[i][0],
                image: animeNames[i][1],
                link: animeNames[i][2],
                description: animeNames[i][3],
                voteCount: 0,
                group: groupNum
            }));
            // to know who added the anime
            voter_[msg.sender].animeName = animeNames[i][0];
        }
        ++groupNum;

        if (currentAnimesGrp_.length < 1) {
            creator = msg.sender;

            readCurrentGroup(); 
        } 
    }

    function readAllAnime() view public returns (Anime [] memory animeData) {
        animeData = animes_;
    }

    // I used keccak256(abi.encodePacked(<String>)) because its difficult to compare different String storage types 
    function readAnimeByName(string memory anime) view public returns (
        string memory theAnimeName,
        string memory theAnimeImg,
        string memory theAnimeLink,
        string memory theAnimeDesc,
        uint theAnimeVote,
        uint theAnimeGrp
    ) {
        for (uint256 i = 0; i < animes_.length; i++) {
            if (keccak256(abi.encodePacked(anime)) == keccak256(abi.encodePacked(animes_[i].name))) {
                theAnimeName = animes_[i].name;
                theAnimeImg = animes_[i].image;
                theAnimeLink = animes_[i].link;
                theAnimeDesc = animes_[i].description;
                theAnimeVote = animes_[i].voteCount;
                theAnimeGrp = animes_[i].group;
            } 
        }
    }



    Anime [] internal grpAnimes_;

    function readAnimeGroup(uint num) external { // changed from public to external 
        delete grpAnimes_;
        for (uint256 i = 0; i < animes_.length; i++) {
            if (animes_[i].group == num) {
                grpAnimes_.push(animes_[i]);
            }
        }
    }

    

    function getAnimeGroup( ) view public returns (Anime [] memory animeData) {
        animeData = grpAnimes_;
        
    }

    function readCurrentGroup() internal {
        delete currentAnimesGrp_;
        for (uint256 i = 0; i < animes_.length; i++) {
            if (animes_[i].group == atGrpNum) {
                currentAnimesGrp_.push(animes_[i]);
            }
        }

    }

    function getCurrentGroup() view external returns (Anime [] memory animeData) {
        animeData = currentAnimesGrp_;
    }


    function rightToVote() internal {
        // require(!voter_[msg.sender].hasVoted, "You can only vote once");
        require(voter_[msg.sender].voteWeight < 6, "You can't vote more than 5 times");
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                address(this),
                cost
            ),
            "You need to pay to vote."
        );
        totalVoteCount++;
    }

    // will optimize this to not use excessive gas (limit to only currentAnimesGrp_)
    function voting(string memory animeName) public payable  {
        rightToVote();

        for (uint8 i = 0; i < currentAnimesGrp_.length; i++) {
            if (keccak256(abi.encodePacked(animeName)) == keccak256(abi.encodePacked(currentAnimesGrp_[i].name))) {
                ++currentAnimesGrp_[i].voteCount;

                voters.push(Voter({
                    address_: msg.sender,
                    animeName: currentAnimesGrp_[i].name,
                    hasVoted: true,
                    voteWeight: voter_[msg.sender].voteWeight++
                }));

                if (currentAnimesGrp_[i].voteCount > 10) {
                    isThereWinner = true; // if true the frontend calls the winner
                }                
            } 
        }
        // I need to repeat this for the separate currentGrp 
        for (uint256 i = 0; i < animes_.length; i++) {
            if (keccak256(abi.encodePacked(animeName)) == keccak256(abi.encodePacked(animes_[i].name))) {
                ++animes_[i].voteCount;
            } 
        }
    }

    function winningAnime() public view returns (uint winner) {
        if (contractStartAt > block.timestamp - 30 minutes) {
            revert("It's too early to determine the winner");
        }
        uint winningVoteCount;
        for (uint8 i = 0; i < currentAnimesGrp_.length; i++) {
            if (currentAnimesGrp_[i].voteCount > winningVoteCount) {
                winningVoteCount = currentAnimesGrp_[i].voteCount;
                winner = i;
            }
        }
    }

    function winningAnimeName() public view returns (string memory winnerName) {
        winnerName = currentAnimesGrp_[winningAnime()].name;
    }

    address [] internal winningAddress;

    function winningVoter() external {
        for (uint8 i = 0; i < voters.length; i++) {
            if (keccak256(abi.encodePacked(currentAnimesGrp_[winningAnime()].name)) == keccak256(abi.encodePacked(voters[i].animeName))) {
                winningAddress.push(voters[i].address_);
            } 
        }

    }

    // The winning voter will be a random
    // This can be manipulated, will import a real pseudo-random generator
    function random() private view returns (uint8) {
      return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, contractStartAt))) % winningAddress.length +1); // max is 256 because of uint8 (2**8) and not truly random
    }


    function getWinningVoter() private view returns (address _address) {
        uint num = random();
        _address = winningAddress[num];
    }



    function payWinner() external {
        require(
            msg.sender == creator || msg.sender == 0xD46205cDD6975Ff2f00F9BC3F18Ec439778CB411 || msg.sender == 0x8CC81b8b357AA0e8314F6d60fa570a9D1191f6C2,
            "Only the group creator or a chosen watcher can pay out"
        );
        currentWinner = getWinningVoter() ;
        uint funds = totalVoteCount * cost; // All votes amount to the cost of 2

        require(
            IERC20Token(cUsdTokenAddress).transfer(
            payable(currentWinner),
            funds), 
            "Something went wrong!"
        );

        for (uint256 i = 0; i < animes_.length; i++) {
            if (animes_[i].group == atGrpNum) {
                delete animes_[i];
            }
        }

        previousAnimesGrp_ = currentAnimesGrp_[winningAnime()];
        previousWinner = currentWinner;
        delete currentAnimesGrp_;
        delete currentWinner;
        ++atGrpNum;

        if(currentAnimesGrp_.length < 1) {
            readCurrentGroup();
        }
        totalVoteCount = 0;
        isThereWinner = false;
        delete voters;
        delete winningAddress;
        contractStartAt = block.timestamp;

    }
}