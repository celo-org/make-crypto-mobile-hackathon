import React from "react";
import "../style/VideoCard.css";
//import HoverVideoPlayer from "react-hover-video-player";
//import video from '../assets/sample.mp4'
import livePhoto from '../assets/livePhoto.jpg'

export default function VideoCard(prop) {
  // console.log(prop.videoObj);
  return (
    <div
      onClick={() => {
        prop.onRouteChange("view");
        prop.onVideoView(prop.videoLink, prop.videoObj);
      }}
      className="videocard"
    >
      <div style={{
          width: "100%",
          height: "80%",
        }}>
        <img
              src={prop.imglink==='stream'?livePhoto:prop.imglink}
              alt=""
              style={{
                // Make the image expand to cover the video's dimensions
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{ height: "20%", backgroundColor: "white" }}>
          {prop.title}
        </div> 
        {prop.stream&&<div style={{
            width: "15px",
            background: "red",
            height: "15px",
            borderRadius: "100%"}}></div>}
      </div>
    </div>
  );
}
