// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;
//github se copy(jisse apan ne video liye hai)

contract playlist {

    struct video {
        uint id;
        address creator;
        string description;
        string title;
        string thumbnailHash; // use bytes32 instead
        string videoHash; // use bytes32 instead
        string categories;
    }
    
    video [] public videoArray;
    
    uint iteration = 3; // change to clean swipe contract
    
    function addVideo(string memory _title, string memory _thumbnailHash, string memory _videoHash,string memory _description ,string memory _categories) public returns(bool) {
        if (isExisting(_thumbnailHash, _videoHash) == false) {
            uint _id = videoArray.length;
   
            videoArray.push(video({
                id: _id,
                title: _title,
                thumbnailHash: _thumbnailHash,
                videoHash: _videoHash,
                description: _description,
                categories: _categories,
                creator: msg.sender
                
            }));
            return true;
        } else {
            return false;
        }
    }
    
    function isExisting(string memory _thumbnailHash, string memory _videoHash) public view returns(bool) {
        for (uint i=0; i<videoArray.length; i++) {
            if (keccak256(abi.encodePacked(videoArray[i].thumbnailHash)) == keccak256(abi.encodePacked(_thumbnailHash)) || keccak256(abi.encodePacked(videoArray[i].videoHash)) == keccak256(abi.encodePacked(_videoHash))) {
                return true;
            }
        }
        return false;
    }
    
    function getVideo(uint _id) public view returns(string memory) {
        return string(abi.encodePacked(videoArray[_id].title, "/", videoArray[_id].thumbnailHash, "/", videoArray[_id].videoHash , "/", videoArray[_id].description,  "/", videoArray[_id].categories, "/", videoArray[_id].creator));
    }
    
    
    
    
    function getVideos() public view returns(video[] memory) {
           return videoArray;
       }
  
    
    function getArrayLength() public view returns(uint) {
        return videoArray.length;
    }
    
    
  
    

    
    
}