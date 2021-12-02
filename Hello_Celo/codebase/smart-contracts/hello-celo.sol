pragma solidity >=0.5.0 <0.7.0;

contract HelloCelo // defining the contract
{
    // a post from a user
    struct Post {
        address userAddress; // user's eth address
        string location;
    }

    // mapping from username to their latest Post
    mapping(string => Post) posts;

    // get the current location for the user's post
    function postForUser(string memory userName)
    public
    view
    returns (string memory)
    {
        Post storage post = posts[userName];

        if (post.userAddress == address(0)) {
            // there was no post
            return "";
        } else {
            return post.location;
        }
    }

    // claim a user name, this sets it to a default empty string
    function claimUserName(string memory userName)
    public
    {
        Post storage currentPost = posts[userName];
        require(currentPost.userAddress == address(0));
        posts[userName] = Post(msg.sender, "");
    }

    // update user post location
    function postLocation(string memory userName, string memory location)
    public
    {
        Post memory currentPost = posts[userName];
        require(currentPost.userAddress == msg.sender);
        posts[userName] = Post(currentPost.userAddress, location);
    }

    function verifyMsg(bytes32 h, uint8 v, bytes32 r, bytes32 s, string memory msgStr) public pure returns (address) {

        bytes32 _proof = keccak256(bytes(msgStr));

        if (_proof != h) {
            revert("proof does not equal h");
        }

        // get the address used to sign the hash
        return ecrecover(h, v, r, s);
    }

    function claimUsernameMeta(bytes32 h, uint8 v, bytes32 r, bytes32 s, string memory userName) public {
        address sigAddress = verifyMsg(h, v, r, s, userName);
        if (sigAddress != address(0)) {
            Post storage currentPost = posts[userName];
            require(currentPost.userAddress == address(0));
            posts[userName] = Post(sigAddress, "");
        } else {
            revert("sigAddress was null");
        }
    }

    function postLocationMeta(bytes32 h, uint8 v, bytes32 r, bytes32 s, string memory userName, string memory location) public {
        // get the address that signed the data
        address sigAddress = verifyMsg(h, v, r, s, location);
        // sig should be valid for an address
        if (sigAddress != address(0)) {
            // get the current post for the claimed username
            Post memory currentPost = posts[userName];
            // make sure the address that signed the meta tx is the same as the one
            // saved for that address
            require(currentPost.userAddress == sigAddress);
            // intern the latest post
            posts[userName] = Post(currentPost.userAddress, location);
        } else {
            revert("sigAddress was null");
        }
    }

}
