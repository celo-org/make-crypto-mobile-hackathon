pragma solidity ^0.4.17;

import "./Ownable.sol";

/// @title Oracle21Yield
/// @author Mael KREJCI
/// @notice Collects and provides information on the positions secured with yield, by 21yield
contract Oracle21Yield is Ownable {
    Position[] positions;
    mapping(bytes32 => uint) positionIdToIndex;

    //defines a position
    struct Position {
        bytes32 id;             //unique id
        bytes32 userId;         //user id from flutter aws backend
        address userAddress;    //user blockchain address to allow only user to withdraw 
        uint16 amount;          //amount of eur secured with yield for the user, to be stored in yeur
        PositionStatus status;  //the outcome (if decided)
    }

    //defines status of a position
    enum PositionStatus {
        Open,
        Close,
        None
    }

    /// @notice returns the array index of the position with the given id 
    /// @dev if the position id is invalid, then the return value will be incorrect and may cause error; you must call positionExists(_positionId) first!
    /// @param _positionId the match id to get
    /// @return an array index 
    function _getPositionIndex(bytes32 _positionId) private view returns (uint) {
        return positionIdToIndex[_positionId]-1; 
    }

    /// @notice determines whether a position exists with the given id 
    /// @param _positionId the position id to test
    /// @return true if position exists and id is valid
    function positionExists(bytes32 _positionId) public view returns (bool) {
        if (positions.length == 0)
            return false;
        uint index = positionIdToIndex[_positionId]; 
        return (index > 0); 
    }

    /// @notice puts a new position into the blockchain 
    /// @param _id id of the position in the aws backend
    /// @param _userId user id in the aws backend
    /// @param _userAddress user id in the aws backend
    /// @param _amount total of position in EUR
    /// @return the unique id of the newly created match 
    function addPosition(bytes32 _id, bytes32 _userId, address _userAddress, uint16 _amount) onlyOwner public returns (bytes32) {

        //require that the position be unique (not already added)
        require(!positionExists(_id));
        
        //add the position 
        uint newIndex = positions.push(Position(_id, _userId, _userAddress, _amount, PositionStatus.Open))-1; 
        matchIdToIndex[id] = newIndex+1;
        
        //return the unique id of the new match
        return _id;
        
        }

    /// @notice gets the specified position 
    /// @param _positionId the unique id of the desired position 
    /// @return position data of the specified position 
    function getPosition(bytes32 _positionId) public view returns (
        bytes32 id,
        bytes32 userId,
        address userAddress, 
        uint16 amount,
        PositionStatus status) {
        
        //get the match 
        if (positionExists(_positionId)) {
            Position storage thePosition = positions[_getPositionIndex(_positionId)];
            return (thePosition.id, thePosition.userId, thePosition.userAddress, thePosition.amount, thePosition.status); 
        }
        else {
            return (_positionId, "", "", 0, PositionStatus.None); 
        }
    }

    /// @notice can be used by a client contract to ensure that they've connected to this contract interface successfully
    /// @return true, unconditionally 
    function testConnection() public pure returns (bool) {
        return true; 
    }

    /// @notice gets the address of this contract 
    /// @return address 
    function getAddress() public view returns (address) {
        return this;
    }

    /// @notice for testing 
    function addTestData() external onlyOwner {
        addMatch("positionId", "userId", 100);
    }
}