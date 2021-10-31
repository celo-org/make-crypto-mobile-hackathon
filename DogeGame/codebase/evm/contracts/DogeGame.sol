// SPDX-License-Identifier: Copyright

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
// import 'hardhat/console.sol';

contract DogeGame is Ownable {
  // TYPE DECLARATIONS
  struct PersonParam {
    string name;
    string image;
  }

  struct Person {
    uint id;
    string name;
    string image;
    string punchline;
    address owner;
    bool active;
    uint timestamp; // of the takeover
  }

  // @todo: why not an array?
  mapping (uint => Person) personIdToPerson;

  uint noOfPersons;

  // scores
  mapping(address => uint256) public scores; // seconds of cumulative holdings
  mapping(address => address) public nextPlayers;
  address constant GUARD = address(1);

  // just to return leaderboard
  struct Player {
    address player;
    uint score;
  }

  // last round winners
  struct Winner {
    address winner;
    uint prize;
    uint score;
  }

  uint constant noOfWinners = 8;
  Winner[noOfWinners] public lastWinners;

  struct Allowance {
    uint value;
    uint timestamp;
  }

  address[] public allowanceAddresses;

  mapping (address => Allowance) public addressToAllowance;

  // STATE VARIABLES
  uint public price = 1 ether;
  uint public prizePool;

  string public defaultPunchline = 'Take Me Over!';

  bool public paused = true;
  enum State { unpaused, paused, retaken, distributed, wiped }
  State public state = State.paused;

  // EVENTS
  event Purchase (
    address indexed buyer,
    uint indexed personId,
    string punchline
  );

  event Paused();
  event Unpaused();

  event Withdrawn(address indexed beneficiary, uint256 amount);
  event AllowanceUpdate(address indexed account, uint256 allowance);

  // FUNCTIONS
  constructor(
    PersonParam[] memory _persons
  ) {
    nextPlayers[GUARD] = GUARD;

    noOfPersons = _persons.length;

    for(uint i = 0; i < noOfPersons; i++) {
      personIdToPerson[i] = Person({
        id: i,
        name: _persons[i].name,
        image: _persons[i].image,
        punchline: defaultPunchline,
        owner: owner(),
        active: true,
        timestamp: 0
      });
    }
  }

  receive() external payable {}

  // *** WITHDRAW
  function withdraw() public whenNotPaused {
    uint amount = addressToAllowance[msg.sender].value;

    if(amount == 0) {
      return;
    }

    addressToAllowance[msg.sender].value = 0;
    addressToAllowance[msg.sender].timestamp = block.timestamp;
    payable(msg.sender).transfer(amount);
    emit Withdrawn(msg.sender, amount);
    emit AllowanceUpdate(msg.sender, 0);
  }

  function fullWithdrawal() public onlyOwner whenPaused {
    uint amount = address(this).balance;
    if(amount == 0) {
      return;
    }
    payable(owner()).transfer(amount);
    emit Withdrawn(msg.sender, amount);
  }

  function ownerWithdraw(address _player) public onlyOwner {
    uint amount = addressToAllowance[_player].value;
    if(amount == 0) {
      return;
    }
    addressToAllowance[_player].value = 0;
    addressToAllowance[_player].timestamp = block.timestamp;
    payable(owner()).transfer(amount);
    emit Withdrawn(msg.sender, amount);
    emit AllowanceUpdate(_player, 0);
  }

  function mint(
    string memory _name,
    string memory _image
  ) public onlyOwner {
    personIdToPerson[noOfPersons] = Person({
      id: noOfPersons,
      name: _name,
      image: _image,
      punchline: defaultPunchline,
      owner: owner(),
      active: true,
      timestamp: 0
    });

    noOfPersons++;
  }

  function updatePersonActive(uint _personId, bool _active) external onlyOwner {
    if(personIdToPerson[_personId].active != _active) {
      personIdToPerson[_personId].active = _active;
    }
  }

  function updatePersonName(uint _personId, string memory _name) external onlyOwner {
    personIdToPerson[_personId].name = _name;
  }

  function updatePeronImage(uint _personId, string memory _image) external onlyOwner {
    personIdToPerson[_personId].image = _image;
  }

  function setPrice(uint _price) external onlyOwner whenPaused {
    price = _price;
  }

  function setDefaultPunchline(string calldata _punchline) external onlyOwner {
    defaultPunchline = _punchline;
  }

  function getPerson(uint _personId) public view returns(Person memory person) {
    person = personIdToPerson[_personId];
  }

  function getPersons() public view returns(Person[] memory toReturn) {
    toReturn = new Person[](noOfPersons);

    for(uint i = 0; i < noOfPersons; i++) {
      toReturn[i] = personIdToPerson[i];
    }
  }

  // @todo: reduce gas to 0
  // idea 1: just store person id in the contract. Punchlines only as events
  function buy(uint _personId, string memory _punchline) public payable whenNotPaused {
    require(msg.value >= price, "payment amount too low");

    Person storage person = personIdToPerson[_personId];

    // update leaderboard
    if(person.owner != owner()) {
      uint score = block.timestamp - person.timestamp;
      increaseScore(person.owner, score);
    }

    // transfer the person
    person.owner = msg.sender;
    person.punchline = _punchline;
    person.timestamp = block.timestamp;

    // distribute payment
    prizePool += price;
    emit Purchase(msg.sender, _personId, _punchline);
  }

  function retake() external onlyOwner whenPaused {
    require(state == State.paused, "state should be paused");
    Person storage person;

    for(uint i = 0; i < noOfPersons; i++) {
      person = personIdToPerson[i];
      // add score
      if(person.owner != owner()) {
        uint score = block.timestamp - person.timestamp;
        increaseScore(person.owner, score);
        // update timestamp
        person.timestamp = block.timestamp;
        person.owner = owner();
        person.punchline = defaultPunchline;
      }
    }
    state = State.retaken;
  }

  function distributePrizePool() external onlyOwner whenPaused {
    require(state == State.retaken, "state should be retaken");
    address[] memory winners = getTop(noOfWinners);
    uint[] memory prizes = new uint[](noOfWinners);

    prizes[0] = prizePool * 16 / 50;  // 32%
    prizes[1] = prizePool * 11 / 50;  // 22%
    prizes[2] = prizes[1] / 2;        // 11%
    prizes[3] = prizePool * 2 / 25;   // 8%
    prizes[4] = prizePool * 3 / 50;   // 6%
    prizes[5] = prizePool / 20;       // 5%
    prizes[6] = prizePool / 25;       // 4%
    prizes[7] = prizePool / 50;       // 2%

    for(uint i = 0; i < noOfWinners; i++) {
      address winner = winners[i];

      if(addressToAllowance[winner].timestamp == 0) {
        allowanceAddresses.push(winner);
      }

      addressToAllowance[winner].value += prizes[i];
      addressToAllowance[winner].timestamp = block.timestamp;

      emit AllowanceUpdate(winner, addressToAllowance[winner].value);

      lastWinners[i] = Winner({
        winner: winner,
        prize: prizes[i],
        score: scores[winner]
      });
    }

    // give money to the dev
    addressToAllowance[owner()].value += prizePool - prizes[0] - prizes[1]
      - prizes[2] - prizes[3] - prizes[4] - prizes[5] - prizes[6] - prizes[7];
    addressToAllowance[owner()].timestamp = block.timestamp;

    prizePool = 0;
    state = State.distributed;
  }

  function getLastWinners() external view returns (Winner[noOfWinners] memory) {
    return lastWinners;
  }

  // PAUSE
  /**
   * @dev Modifier to make a function callable only when the contract is not paused.
   */
  modifier whenNotPaused() {
    if(msg.sender != owner()) {
      require(!paused, "Pausable: paused");
    }
    _;
  }

  /**
   * @dev Modifier to make a function callable only when the contract is paused.
   */
  modifier whenPaused() {
    require(paused, "Pausable: not paused");
    _;
  }

  /**
   * @dev Triggers stopped state.
   */
  function pause() public whenNotPaused onlyOwner {
    paused = true;
    emit Paused();
    state = State.paused;
  }

  /**
   * @dev Returns to normal state.
   */
  function unpause() public whenPaused onlyOwner {
    paused = false;
    emit Unpaused();
    state = State.unpaused;
  }


  // LIST FUNCTIONS
  function wipePlayers() public whenPaused onlyOwner {
    require(state == State.distributed, "state should be distributed");
    // reset all nextStudens to 0
    address currentAddress = GUARD;
    // add a counter to limit to 1000 just in case !!!
    while(nextPlayers[currentAddress] != GUARD) {
      scores[nextPlayers[currentAddress]] = 0;
      currentAddress = nextPlayers[currentAddress];
    }
    // wipe list of players
    nextPlayers[GUARD] = GUARD;
    state = State.wiped;
  }

  function addPlayer(address player, uint256 score) internal {
    require(nextPlayers[player] == address(0));
    address index = _findIndex(score);
    scores[player] = score;
    nextPlayers[player] = nextPlayers[index];
    nextPlayers[index] = player;
  }

  function increaseScore(address player, uint256 score) internal {
    if(nextPlayers[player] == address(0)) {
      return addPlayer(player, score);
    }
    updateScore(player, scores[player] + score);
  }

  function updateScore(address player, uint256 newScore) internal {
    require(nextPlayers[player] != address(0));
    address prevPlayer = _findPrevPlayer(player);
    address nextPlayer = nextPlayers[player];
    if(_verifyIndex(prevPlayer, newScore, nextPlayer)){
      scores[player] = newScore;
    } else {
      removePlayer(player);
      addPlayer(player, newScore);
    }
  }

  function removePlayer(address player) internal {
    require(nextPlayers[player] != address(0));
    address prevPlayer = _findPrevPlayer(player);
    nextPlayers[prevPlayer] = nextPlayers[player];
    nextPlayers[player] = address(0);
    scores[player] = 0;
  }

  function getTop(uint256 k) public view returns(address[] memory) {
    address[] memory playerLists = new address[](k);
    address currentAddress = nextPlayers[GUARD];
    for(uint256 i = 0; i < k; ++i) {
      if(currentAddress == GUARD) {
        playerLists[i] = owner();
      } else {
        playerLists[i] = currentAddress;
        currentAddress = nextPlayers[currentAddress];
      }
    }
    return playerLists;
  }

  function getNoOfPlayers() public view returns(uint noOfPlayers) {
    address currentAddress = GUARD;

    while(nextPlayers[currentAddress] != GUARD) {
      ++noOfPlayers;
      currentAddress = nextPlayers[currentAddress];
    }
  }

  function getPlayers() public view returns(address[] memory) {
    return getTop(getNoOfPlayers());
  }

  function getLeaderboard() public view returns(Player[] memory) {
    uint noOfPlayers = getNoOfPlayers();

    Player[] memory leaderboard = new Player[](noOfPlayers);

    address currentAddress = nextPlayers[GUARD];
    for(uint256 i = 0; i < noOfPlayers; ++i) {
      require(currentAddress != GUARD, "Can't get top players");
      leaderboard[i] = Player({
        player: currentAddress,
        score: scores[currentAddress]
      });
      currentAddress = nextPlayers[currentAddress];
    }
    return leaderboard;
  }

  function _verifyIndex(address prevPlayer, uint256 newValue, address nextPlayer)
    internal
    view
    returns(bool)
  {
    return (prevPlayer == GUARD || scores[prevPlayer] >= newValue) &&
           (nextPlayer == GUARD || newValue > scores[nextPlayer]);
  }

  function _findIndex(uint256 newValue) internal view returns(address player) {
    address candidateAddress = GUARD;
    while(true) {
      if(_verifyIndex(candidateAddress, newValue, nextPlayers[candidateAddress]))
        return candidateAddress;
      candidateAddress = nextPlayers[candidateAddress];
    }
  }

  function _isPrevPlayer(address player, address prevPlayer) internal view returns(bool isPrevPlayer) {
    return nextPlayers[prevPlayer] == player;
  }

  function _findPrevPlayer(address player) internal view returns(address player_) {
    address currentAddress = GUARD;
    while(nextPlayers[currentAddress] != GUARD) {
      if(_isPrevPlayer(player, currentAddress))
        return currentAddress;
      currentAddress = nextPlayers[currentAddress];
    }
    return address(0);
  }

}
