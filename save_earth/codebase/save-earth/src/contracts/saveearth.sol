// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.7;

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

contract Saveearth {
    // donate event
    // get the name of pic, address of donator, amount
    // total donation
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    uint public totalDonation;

    // indexed helps when filtering events
    event donateEvent(
        address indexed address_,
        string indexed name_,
        uint amount_,
        uint timestamp
    );

    event rewardEvent(
        address indexed address_,
        string indexed name_,
        uint timestamp
    );

    struct Discovery {
        uint _rewardRecieved;
        string [] discovered;
    }

    mapping(address => Discovery) discoveries;

    uint rewardAmount = 5e18;

    function donate(uint _amount, string memory _name) public payable {
        // require(msg.value == _amount, "Amount should be equal to msg value");
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                address(this),
                _amount
            ),
            "Donation failed."
        );

        totalDonation = totalDonation + _amount;

        emit donateEvent(msg.sender, _name, _amount, block.timestamp );
    }

    function reward(address _address, string memory _name) public payable {
        uint count;
        for (uint32 i = 0; i < discoveries[_address].discovered.length; i++) {
            if (keccak256(abi.encodePacked(discoveries[_address].discovered[i])) == keccak256(abi.encodePacked(_name)) ) {
                count++;
            }
        }

        require(count<3, "You can't can't get paid for the same discovery more than thrice");

        require(
            IERC20Token(cUsdTokenAddress).transfer(
            payable(_address),
            rewardAmount
            ),
            "Donation failed."
        );

        discoveries[_address].discovered.push(_name);
        discoveries[_address]._rewardRecieved = discoveries[_address]._rewardRecieved + rewardAmount;


        emit rewardEvent(_address, _name, block.timestamp );
    }


    // reward event
    // reward name of pic, address of rewardee, amount
    // total rewarded
}