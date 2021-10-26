// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

    
// Date-related constants for sanity-checking dates to reject obvious erroneous inputs
// and conversions from seconds to days and years that are more or less leap year-aware.
uint32 constant THOUSAND_YEARS_DAYS = 365243;
uint32 constant TEN_YEARS_DAYS = THOUSAND_YEARS_DAYS / 100;
uint32 constant SECONDS_PER_DAY = 24 * 60 * 60;
uint32 constant JAN_1_2000_SECONDS = 946684800;
uint32 constant JAN_1_2000_DAYS = JAN_1_2000_SECONDS / SECONDS_PER_DAY;
uint32 constant JAN_1_3000_DAYS = JAN_1_2000_DAYS + THOUSAND_YEARS_DAYS;

contract GrantFactory {
	event OneDeposited(uint256 amount);
    Grant[] public deployedGrants;
    
    mapping(address => uint256[]) grantHolders;
    struct pair {
        uint256 index;
        address grantHolder;
    }
    mapping(address => pair[]) grantorsContracts;
    mapping(address => bool) grantors;
    
    
	receive () payable external {
        emit OneDeposited(msg.value);
    }

    function CreateGrant(
        address payable beneficiary,
        //uint256 totalAmount,
        uint256 vestingAmount,
        uint32 startDay,
        uint32 duration,
        uint32 cliffDuration,
        uint32 interval,
        bool isRevocable) payable public {
            
        require(IsGrantor(msg.sender) == true, "You're not a grantor");
        
		require(beneficiary != msg.sender, "Grantor can not be grant holder");
		// Make sure address is valid.
        require(beneficiary != address(0), "Beneficiary is the zero address");
        
        // Check for a valid vesting schedule given
        // (disallow absurd values to reject likely bad input).
        require(duration > 0 && duration <= TEN_YEARS_DAYS &&
                cliffDuration < duration &&
                interval >= 1, "invalid vesting schedule");

        // Make sure the duration values are in harmony with interval
        // (both should be an exact multiple of interval).
        require(duration % interval == 0 && cliffDuration % interval == 0,
                "invalid cliff/duration for interval");
        
        // Check for valid vestingAmount
        require(/*vestingAmount <= totalAmount &&*/ vestingAmount > 0 &&
                startDay >= JAN_1_2000_DAYS && startDay < JAN_1_3000_DAYS,
                "invalid vesting params");

        Grant grant = new Grant {value: msg.value} (beneficiary, vestingAmount,
            startDay, duration, cliffDuration, interval, isRevocable);
		
		grant.transferOwnership(msg.sender);
        
        uint index = deployedGrants.length + 1;
        deployedGrants.push(grant);
        grantHolders[beneficiary].push(index);
        grantorsContracts[msg.sender].push(pair(index, beneficiary));
    }
    
    struct grantPair {
        Grant grantAddress;
        address grantHolder;
    }

    function GetDeployedGrants(address sender) public view returns(grantPair[] memory) {
        grantPair[] memory grants = new grantPair[](grantorsContracts[sender].length);
        for (uint i = 0; i < grantorsContracts[sender].length; i++) {
            uint index = grantorsContracts[sender][i].index;
            grants[i] = grantPair(deployedGrants[index - 1], grantorsContracts[sender][i].grantHolder);
        }

        return grants;
    }
    
    function GetMyGrants(address sender) public view returns(Grant[] memory) {
        Grant[] memory grants = new Grant[](grantHolders[sender].length);
        for (uint i = 0; i < grantHolders[sender].length; i++) {
            uint index = grantHolders[sender][i];
            grants[i] = (deployedGrants[index - 1]);
        }
        
        return grants;
    }

	function IsGrantor(address sender) public view returns(bool) {
	    return grantors[sender];
	}

    function RegisterGrantor() public {
        grantors[msg.sender] = true;
    } 

}

contract Grant is Ownable {
    event OneDeposited(uint256 amount);
    event OneReleased(uint256 amount);
    event OneVestingRevoked();

    struct vestingSchedule {
        bool isValid;               /* true if an entry exists and is valid */
        bool isRevocable;           /* true if the vesting option is revocable (a gift), false if irrevocable (purchased) */
        uint32 cliffDuration;       /* Duration of the cliff, with respect to the grant start day, in days. */
        uint32 duration;            /* Duration of the vesting schedule, with respect to the grant start day, in days. */
        uint32 interval;            /* Duration in days of the vesting interval. */
    }

    struct tokenGrant {
        bool isActive;              /* true if this vesting entry is active and in-effect entry. */
        bool wasRevoked;            /* true if this vesting schedule was revoked. */
        uint32 startDay;            /* Start day of the grant, in days since the UNIX epoch (start of day). */
        uint256 amount;             /* Total number of tokens that vest. */
        address payable vestingLocation;    /* Address of wallet that is holding the vesting schedule. */
        //address payable grantor;            /* Grantor that made the grant */
    }

    // beneficiary of one after they are released
    address payable private _beneficiary;
    vestingSchedule private _vestingSchedule;
    tokenGrant private _tokenGrant;
    uint256 private _released;

    constructor (address payable beneficiary, uint256 vestingAmount,
			uint32 startDay, uint32 duration, uint32 cliffDuration, uint32 interval, bool isRevocable) 
			payable {
 
        // Create and populate a vesting schedule.
        _vestingSchedule = vestingSchedule(
            true /*isValid*/,
            isRevocable,
            cliffDuration,
            duration,
            interval);
        
        _tokenGrant = tokenGrant(
            true /*isActive*/,
            false /*wasRevoked*/,
            startDay,
            vestingAmount,
            beneficiary /* The wallet address where the vesting schedule is kept. */ );
            //payable(owner())          /* The account that performed the grant (where revoked funds would be sent) */
    
        // Set beneficiary.
        _beneficiary = beneficiary;
    }

    // Payable fallback function allows ONE to be deposited into the contract.
    receive () payable external {
        emit OneDeposited(msg.value);
    }

    function getBalance() public view returns (uint256 balance) {
        return address(this).balance;
    }

    function inspectSender() public view returns(address) {
        return msg.sender;
    }

    function getBeneficiary() public view returns (address) {
        return _beneficiary;
    }

    // function getVestingSchedule() public view returns (vestingSchedule memory) {
    //     return _vestingSchedule;
    // }
    
    // function getTokenGrant() public view returns (tokenGrant memory) {
    //     return _tokenGrant;
    // }
    
    function today() public view returns (uint32 dayNumber) {
        return uint32(block.timestamp / SECONDS_PER_DAY);
    }

    function _effectiveDay(uint32 onDayOrToday) internal view returns (uint32 dayNumber) {
        return onDayOrToday == 0 ? today() : onDayOrToday;
    }
    
    function _getNotVestedAmount(uint32 onDayOrToday) internal view returns (uint256 amountNotVested) {
        uint32 onDay = _effectiveDay(onDayOrToday);

        if (!_tokenGrant.isActive || onDay < _tokenGrant.startDay + _vestingSchedule.cliffDuration)
        {
            // None are vested.
            return _tokenGrant.amount;
        }
        // If after end of vesting, then the not vested amount is zero (all are vested).
        else if (onDay >= _tokenGrant.startDay + _vestingSchedule.duration)
        {
            // All are vested.
            return uint256(0);
        }
        // Otherwise a fractional amount is vested.
        else
        {
            // Compute the exact number of days vested.
            uint32 daysVested = onDay - _tokenGrant.startDay;
            // Adjust result rounding down to take into consideration the interval.
            uint32 effectiveDaysVested =
                (daysVested / _vestingSchedule.interval) * _vestingSchedule.interval;

            uint256 vested =
                (_tokenGrant.amount * effectiveDaysVested) / (_vestingSchedule.duration);
            return _tokenGrant.amount - (vested);
        }
    }
    
    function _getAvailableAmount(uint32 onDay) internal view returns (uint256 amountAvailable) {
        if (_tokenGrant.wasRevoked) {
		    return address(this).balance;
		}
        uint256 totalTokens = address(this).balance;
        uint256 vested = totalTokens - _getNotVestedAmount(onDay);
        return vested;
    }
    
    function getAvailableAmount(uint32 onDay) public view returns (uint256 amountAvailable) {
        return _getAvailableAmount(onDay);
    }
    
    function vestingStatus(uint32 onDayOrToday) public view returns (
        uint256 amountAvailable,
        uint256 amountNotVested,
        uint256 amountOfGrant,
        uint32 vestStartDay,
        uint32 vestDuration,
        uint32 cliffDuration,
        uint32 vestIntervalDays,
        bool isActive,
        bool wasRevoked
    )
    {
        uint256 notVestedAmount = _getNotVestedAmount(onDayOrToday);
        uint256 grantAmount = _tokenGrant.amount;
        uint256 availableAmount = _getAvailableAmount(0);

        return (
            availableAmount,
            notVestedAmount,
            grantAmount,
            _tokenGrant.startDay,
            _vestingSchedule.duration,
            _vestingSchedule.cliffDuration,
            _vestingSchedule.interval,
            _tokenGrant.isActive,
            _tokenGrant.wasRevoked);
    }
    
    
    // Transfers vested ONE tokens to beneficiary.
    function release() public {
        uint256 unreleased = _getAvailableAmount(0);
        require(unreleased > 0, "Nothing left to release");
        _released = _released + (unreleased);
        _beneficiary.transfer(unreleased);

        emit OneReleased(unreleased);
    }

    // Allows the owner to revoke the vesting. ONE already vested
    // remain in the contract, the rest are returned to the owner.
    function revoke() public onlyOwner {
        require(_vestingSchedule.isRevocable, "Grant not revokable");
        require(!_tokenGrant.wasRevoked, "Grant already revoked");

        uint256 balance = address(this).balance;
        uint256 unreleased = _getAvailableAmount(0);
        uint256 refund = balance - unreleased;
        _tokenGrant.wasRevoked = true;
        
        payable(address((owner()))).transfer(refund);

        emit OneVestingRevoked();
    }
}