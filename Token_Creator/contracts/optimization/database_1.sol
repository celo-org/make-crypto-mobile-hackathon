// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Contract {
    string name;
    address contractAddress;
}

/**
 * @dev This Database saves an array of contracts for each owner
 */
contract Database1 {
    mapping(address => Contract[]) public contractsOfOwner;

    function addContract(
        address owner,
        string memory name,
        address contractAddress
    ) public {
        contractsOfOwner[owner].push(Contract(name, contractAddress));
    }

    function getContractsOfOwner(address owner)
        external
        view
        returns (Contract[] memory contracts)
    {
        return contractsOfOwner[owner];
    }
}
