// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RecyclingMachineFactory {
    RecyclingMachine[] public deployedMachines;

    function CreateRecyclingMachine() public {
        RecyclingMachine machine = new RecyclingMachine(msg.sender);
        deployedMachines.push(machine);
    }
    
    function GetDeployedMachines() public view returns(RecyclingMachine[] memory) {
        return deployedMachines;
    }
}

contract PackagePrices {
  uint256 pet;
  uint256 tetra_pak;
  uint256 glass;
  uint256 aluminium;

  function SetPrices(
    uint256 pet_price,
    uint256 tetra_pak_price,
    uint256 glass_price,
    uint256 aluminium_price) public {

    pet = pet_price;
    tetra_pak = tetra_pak_price;
    glass = glass_price;
    aluminium = aluminium_price;
  }

  function GetPrices() public view returns(
    uint256 _pet, uint256 _tetra_pak, uint256 _glass, uint256 _aluminium) {
      return (pet, tetra_pak, glass, aluminium);
  }
}

contract RecyclingMachine {
    event Paid(address indexed to, address indexed from, uint256 amount);

    address owner;
    uint256 amountToDonate;
    uint256 numOfDonations;
    uint256 totalAmountDonated;
    uint256 numOfPayouts;
    uint256 totalAmountPaidOut;
    
    constructor(address ownerAddress) {
        owner = ownerAddress;
        amountToDonate = 0;
        numOfDonations = 0;
        totalAmountDonated = 0;
        totalAmountPaidOut = 0;
        numOfPayouts = 0;
    }
    
    modifier restricted() {
        require(msg.sender == owner);
        _;
    }
    
    function addFunds() public payable {}
    
    function checkBalance() public view returns(uint256) {
        return address(this).balance;
    }
    
    function withdraw() payable restricted public {
        payable(msg.sender).transfer(address(this).balance);
    }

    function payOut(address payable receiver, uint256 amount, address tokenAddress) payable restricted public {
        uint256 balance = IERC20(tokenAddress).balanceOf(address(this));
        require(balance > amount);
        bool success = IERC20(tokenAddress).transfer(receiver, amount);
        require(success);
        numOfPayouts++;
        emit Paid(receiver, owner, amount);
    }

    function addDonation(uint256 amount) restricted public {
        numOfDonations++;
        amountToDonate += amount;
    }


    function donate(address payable receiver, address tokenAddress) public {
        uint256 balance = IERC20(tokenAddress).balanceOf(address(this));
        require(balance > amountToDonate);
        bool success = IERC20(tokenAddress).transfer(receiver, amountToDonate);
        require(success);
        totalAmountDonated += amountToDonate;
        amountToDonate = 0;
        emit Paid(receiver, owner, amountToDonate);
    }

    function getStatistics() public view returns(
    uint256 _amountToDonate, uint256 _numOfDonations, uint256 _totalAmountDonated, 
    uint256 _numOfPayouts, uint256 _totalAmountPaidOut) {
      return (amountToDonate, numOfDonations, totalAmountDonated, numOfPayouts, totalAmountPaidOut);
  }
}
