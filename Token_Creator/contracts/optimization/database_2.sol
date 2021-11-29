// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Contract {
    string name;
    address contractAddress;
    address owner;
}

/**
 * @dev This Database saves an array of contracts and iterates over them to get
 * contacts by owner
 */
contract Database2 {
    address[] contracts;
    mapping(address => Contract) contractDetails;
    mapping(address => uint256) balanceOf;

    function addContract(
        address owner,
        string memory name,
        address contractAddress
    ) public {
        contracts.push(contractAddress);
        contractDetails[contractAddress] = Contract(
            name,
            contractAddress,
            owner
        );
        balanceOf[owner] += 1;
    }

    function getContractsOfOwner(address owner)
        external
        view
        returns (Contract[] memory returncontracts)
    {
        uint256 count = balanceOf[owner];
        Contract[] memory contractsOfOwner = new Contract[](count);
        uint256 i;
        uint256 resultIndex;
        for (i = 0; i < contracts.length; i++) {
            if (contractDetails[contracts[i]].owner == owner) {
                contractsOfOwner[resultIndex] = contractDetails[contracts[i]];
                resultIndex++;
            }
        }
        return contractsOfOwner;
    }
}
