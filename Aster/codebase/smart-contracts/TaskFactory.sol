// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "./Task.sol";

contract TaskFactory{
    //CELO contract address on Alfajores testnet
    IERC20 public CELO = IERC20(address(0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9));
    
    address payable manager = payable(0x8AfD0fdFA2E66D9F01fbe2587f392f362D06809D); //Aster address
    address[] public tasks;
    uint id;
    
        
    //announcements
    event newTaskCreation(uint id, address taskAdd);
    
    constructor() {
    }
    
    //backend calls to create a Task SC
    function create(uint numLabelers, uint256 amount) public payable returns(address, uint){
        amount = amount * 10**18;
        address taskOwner = msg.sender;
        id = tasks.length;
        
        require(CELO.balanceOf(msg.sender) >= amount, "TaskFactory: insufficient funds.");
        require(msg.value == amount, "TaskFactory: Unmatching funds.");
        
        //5% of payment amount is collected as process fees
        uint256 fees = (5 * amount)/100;
        CELO.transfer(manager, fees);
        //update remaining amount to pay to the task
        amount = amount - fees;

        //create new task and add to the array
        Task newtask = new Task(id, taskOwner, numLabelers, amount);
        CELO.transfer(address(newtask), amount);
        
        tasks.push(address(newtask));

        
        emit newTaskCreation(id, address(newtask));

        return (address(newtask), id);
    }
    

//------------HELPER FUNCTIONS------------------------

    function getAddress(uint _id) public view returns(address){
        // require(manager == msg.sender, "TaskFactory: permission denied.");
        return tasks[_id];
    }

    function getNumDeployedTasks() public view returns(uint){
        // require(manager == msg.sender, "TaskFactory: permission denied.");
        return tasks.length;
    }
    
    
}