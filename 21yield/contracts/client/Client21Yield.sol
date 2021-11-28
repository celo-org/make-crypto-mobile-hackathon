pragma solidity ^0.4.17;

import "./OracleInterface.sol";
import "./Ownable.sol";


/// @title Client to interact with 21yield contracts    
/// @author Mael KREJCI
/// @notice Handles claims and payouts  
contract Client21Yield is Ownable {

    //21Yield results oracle 
    address internal yieldOracleAddr = 0;
    OracleInterface internal yieldOracle = OracleInterface(yieldOracleAddr); 
    
    /// @notice sets the address of the 21yield oracle contract to use 
    /// @dev setting a wrong address may result in false return value, or error 
    /// @param _yieldAddress the address of the 21 yield oracle 
    /// @return true if connection to the new oracle address was successful
    function setOracleAddress(address _yieldAddress) external onlyOwner returns (bool) {
        yieldOracleAddr = _yieldAddress;
        yieldOracle = OracleInterface(yieldOracleAddr); 
        return yieldOracle.testConnection();
    }

    /// @notice gets the address of the yield oracle being used 
    /// @return the address of the currently set oracle 
    function getOracleAddress() external view returns (address) {
        return yieldOracle;
    }

    /// @notice returns the full data of the specified position 
    /// @param _positionId the id of the desired position
    /// @return position data 
    function getPosition(bytes32 _positionId) public view returns (
        bytes32 id,
        bytes32 userId,
        address userAddress, 
        uint16 amount,
        OracleInterface.PositionStatus status) { 

        return yieldOracle.getPosition(_positionId); 
    }

    /// TODO : claim tokens
    /// require to validate sum payouts < sum position opened
    

    /// TODO : burn tokens to cashout


    /// @notice for testing; tests that the 21yield oracle is callable 
    /// @return true if connection successful 
    function testOracleConnection() public view returns (bool) {
        return yieldOracle.testConnection(); 
    }
}