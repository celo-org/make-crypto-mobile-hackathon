import React, { useEffect, useState } from "react";
import "../style/LiveStreamCreator.css";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ReactPlayer from "react-player";

//import ReactPlayer from 'react-player';
import sampleVideo from "../assets/sample2.mp4";
{
  /* <ReactPlayer url='' controls/> */
}

function LiveStreamCreator() {
  const [currentUser, setcurrentUser] = useState(null);
  const [comments, setcomments] = useState(null)
  const [currentStream, setcurrentStream] = useState(null)
  const [currentStreamData, setcurrentStreamData] = useState(null)
  useEffect(async () => {
    setcurrentUser(JSON.parse(window.localStorage.getItem('currentuser')))
    setcurrentStreamData(JSON.parse(window.localStorage.getItem('currentStream')))
  }, [])
  useEffect(async () => {
    if(currentUser){
      const streamRef = collection(db, "videos");
      const streamQuery = query(streamRef, where("streamCreator", "==", currentUser?.address));
      const querySnapshot = await getDocs(streamQuery);
      setcurrentStream(querySnapshot.docs[0].data())
    }
  }, [currentUser])

  return (
    <div className="liveStreamCreator">
      <div className="liveStreamCreator_left">
        <div className="liveStreamCreator_video">
          <ReactPlayer url={`https://cdn.livepeer.com/hls/${currentStreamData.playbackId}/index.m3u8`} controls />
        </div>
        <div className="liveStreamCreator_dashboard">
          <div className="liveStreamCreator_title">
            {currentStream?.stream.streamName }
          </div>
          <div className="liveStreamCreator_items">
            <div className="liveStreamCreator_dp">
              <i class="fas fa-user-astronaut"></i>
              <span>{currentUser?.name}</span>
            </div>
          </div>
        </div>
        <div className="liveStreamCreator_description">
          {currentStream?.stream.streamDescription}
        </div>
      </div>
      <div className="liveStreamCreator_rigth">
        <div className="liveStreamCreator_chats">
          <div style={{ marginBottom: "0.5em", fontSize: "1.5em" }}>
            Live Chat
          </div>
          <div className='chatsList'>
            <div className="chat">
              <i class="far fa-user-circle"></i>&nbsp;
              <span>Ankit Rastogi</span>&nbsp;:&nbsp;
              <span>
                how it would be looking on airport samaya saying bhuvan bhai nange
                aayen hain
              </span>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <input style={{flex:1}} type='text'/>
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveStreamCreator;
