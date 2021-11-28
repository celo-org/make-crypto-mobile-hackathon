// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "./Creator.sol";

contract Creators {
    address public marketplaceAddress;

    mapping(string => address) usernameToCreatorMapping;
    mapping(address => address) addressToCreatorMapping;
    mapping(string => address) usernameToAddressMapping;

    event UserRegistered(address indexed userAddress, string indexed username);

    constructor() {}

    function registerUser(
        string memory username,
        string memory name,
        string memory bio,
        string memory profilePicUrl,
        string memory nftCollectionName,
        string memory nftCollectionSymbol
    ) external returns (address) {
        address temp = usernameToAddressMapping[username];
        require(temp == address(0), "Username already exists");

        Creator creator = new Creator(
            username,
            name,
            bio,
            profilePicUrl,
            nftCollectionName,
            nftCollectionSymbol
        );

        creator.transferOwnership(msg.sender);
        usernameToCreatorMapping[username] = address(creator);
        addressToCreatorMapping[msg.sender] = address(creator);
        emit UserRegistered(msg.sender, username);
        return address(creator);
    }

    function getCreatorAddressByUsername(string memory username)
        external
        view
        returns (address)
    {
        return usernameToCreatorMapping[username];
    }

    function getCreatorAddressBySender() external view returns (address) {
        return addressToCreatorMapping[msg.sender];
    }

    function getCreatorAddressByAddress(address _address)
        external
        view
        returns (address)
    {
        return addressToCreatorMapping[_address];
    }

    function isUserRegistered(address user) external view returns (bool) {
        return addressToCreatorMapping[user] != address(0);
    }
}
