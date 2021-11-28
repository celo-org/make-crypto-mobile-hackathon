pragma solidity ^0.4.17;


/// @title Oracle Interface for 21yield
/// @author Mael KREJCI
contract OracleInterface {

    enum PositionStatus {
        Open,
        Close
    }

    function positionExists(bytes32 _positionId) public view returns (bool); 

    function getPosition(bytes32 _positionId) public view returns (
        bytes32 id,
        bytes32 userId,
        address userAddress, 
        uint16 amount,
        PositionStatus status
    );

    function testConnection() public pure returns (bool);

    function addTestData() public; 
}