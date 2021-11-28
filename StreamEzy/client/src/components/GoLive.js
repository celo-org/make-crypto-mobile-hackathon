import React, { useState } from "react";
import "../style/GoLive.css";
//import { Link } from "react-router-dom";
import axios from "axios";
import one from "../assets/1.svg";
import detail from "../assets/detail.svg";
import category from "../assets/category.svg";
import tag from "../assets/tags.svg";
import title from "../assets/title.svg";
import loader from "../assets/loader.gif";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";

// import ReactPlayer from 'react-player';

export default function Viewpage({ routeChange }) {
  
  
  const [apiKey, setapiKey] = useState("ced26452-f2bd-4173-a0bc-93b4c19628c0");
  const [streamName, setStreamName] = useState("");
  const [streamCategory, setStreamCategory] = useState("");
  const [streamTags, setStreamTags] = useState("");
  const [streamDescription, setStreamDescription] = useState("");
  const [streamData, setStreamData] = useState({});
  const [streamCreated, setstreamCreated] = useState(false);
  const [divActive, setdivActive] = useState("one");

  const createStream = async (apiKey, stream_name) => {
    document.querySelector(".loader").style.display = "flex";
    // POST request using axios with set headers
    const params = JSON.stringify({
      name: stream_name,
      profiles: [
        {
          name: "720p",
          bitrate: 2000000,
          fps: 30,
          width: 1280,
          height: 720,
        },
        {
          name: "480p",
          bitrate: 1000000,
          fps: 30,
          width: 854,
          height: 480,
        },
        {
          name: "360p",
          bitrate: 500000,
          fps: 30,
          width: 640,
          height: 360,
        },
      ],
    });
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      'Target-URL':`https://livepeer.com/api/stream`
    };
    axios
      .post("https://streamzy-proxy.herokuapp.com/", params, { headers })//https://streamzy-proxy.herokuapp.com/
      .then((response) => {
        console.log(response);
        //todo : replace address of current user 
        setDoc(doc(db, "videos", response.data.id), {
          streamCreator:JSON.parse(window.localStorage.getItem('currentuser')).address,
          stream:{
            streamName:streamName,
            streamCategory:streamCategory,
            streamTags:streamTags,
            streamDescription:streamDescription
          }
        }).then(x=>console.log(x));
        document.querySelector(".loader").style.display = "none";
        console.log(response.data);
        setStreamData(response.data);
        window.localStorage.setItem('currentStream',JSON.stringify(response.data))
        setstreamCreated(true);
      })
      .catch((error) => {
        document.querySelector(".loader").style.display = "none";
        console.log(error.message);
      });
  };

  const clickToCopy = (e) => {
    var r = document.createRange();
    r.selectNode(e.target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  const renderSwitch = (param) => {
    switch (param) {
      case "one":
        return (
          <div className="centerDiv">
            <div className="title">Welcome !</div>
            <img src={one} alt="" />
            <button onClick={() => setdivActive("title")}>Next</button>
          </div>
        );
      case "title":
        return (
          <div className="centerDiv">
            <div className="title">Title !</div>
            <img src={title} alt="" />
            <input
              value={streamName}
              type="text"
              name="streamName"
              onInput={(e) => setStreamName(e.target.value)}
              placeholder="Enter Stream Title"
            />
            <div classname="buttonDiv">
              <button onClick={() => setdivActive("one")}>Back</button>
              <button
                onClick={() => {
                  setdivActive("tag");
                }}
              >
                Next
              </button>
            </div>
          </div>
        );
      case "tag":
        return (
          <div className="centerDiv">
            <div className="title">Tag !</div>
            <img src={tag} alt="" />
            <input
              value={streamTags}
              type="text"
              name="tags"
              onInput={(e) => setStreamTags(e.target.value)}
              placeholder="Enter Stream Tags"
            />
            <div classname="buttonDiv">
              <button onClick={() => setdivActive("title")}>Back</button>
              <button onClick={() => setdivActive("category")}>Next</button>
            </div>
          </div>
        );
      case "category":
        return (
          <div className="centerDiv">
            <div className="title">Category !</div>
            <img src={category} alt="" />
            <input
              value={streamCategory}
              type="text"
              name="categories"
              onInput={(e) => setStreamCategory(e.target.value)}
              placeholder="Enter Stream Category"
            />
            <div classname="buttonDiv">
              <button onClick={() => setdivActive("tag")}>Back</button>
              <button onClick={() => setdivActive("description")}>Next</button>
            </div>
          </div>
        );
      case "description":
        return (
          <div className="centerDiv">
            <div className="title">Description !</div>
            <img src={detail} alt="" />
            <input
              value={streamDescription}
              type="text"
              name="description"
              onInput={(e) => setStreamDescription(e.target.value)}
              placeholder="Enter Stream Description"
            />
            <div classname="buttonDiv">
              <button onClick={() => setdivActive("category")}>Back</button>
              <button
                onClick={() => {
                  createStream(apiKey, streamName);
                  console.log("click");
                }}
              >
                Create Stream
              </button>
            </div>
          </div>
        );
      default:
        return "foo";
    }
  };

  return (
    <div className="GoLive">
      <div className="loader">
        <img src={loader} alt="Loading.." />
      </div>
      {streamCreated === false ? (
        renderSwitch(divActive)
      ) : (
        <div style={{ display: "flex" }}>
          <div className="streamDetailsDisplay">
            <div>Stream name - {streamData.name}</div>
            <div>
              Stream streamkey -{" "}
              <span title="click to copy" onClick={(e) => clickToCopy(e)}>
                {streamData.streamKey}
              </span>
            </div>
            <div>
              Stream playback url -{" "}
              <span
                title="click to copy"
                onClick={(e) => clickToCopy(e)}
              >{`https://cdn.livepeer.com/hls/${streamData.playbackId}/index.m3u8`}</span>
            </div>
            <div>
              RTMP Ingest URL / Server -{" "}
              <span
                title="click to copy"
                onClick={(e) => clickToCopy(e)}
              >{`rtmp://rtmp.livepeer.com/live`}</span>
            </div>
            <div>Stream tags - {streamTags}</div>
            <div>Stream categories - {streamCategory}</div>
            <div>Stream description - {streamDescription}</div>
            <div
              style={{ textDecoration: "none", textAlign: "center" }}
              onClick={() => routeChange("/stream-creator")}
            >
              <div>
                <button>Go to Live Stream !</button>
              </div>
            </div>
          </div>
          <div className="instructions">
            <h3>Go live using OBS :</h3>
            <br />
            <p>
              OBS is free and open source software for live streaming.{" "}
              <a
                style={{
                  cursor: "pointer",
                  color: "tan",
                  fontSize: "inherit",
                  textDecoration: "underline",
                }}
                href="https://obsproject.com/download"
                target="_blank"
              >
                Download and install OBS.
              </a>
            </p>
            <p>
              Before streaming, we need to configure OBS. Click on Settings in
              the lower right corner.
            </p>
            <p>First, let’s set the keyframe interval.</p>
            <ol>
              <li>In the Settings sidebar menu, select Output.</li>
              <li>
                At the top, select Advanced from the Output Mode dropdown.
              </li>
              <li>In the Keyframe Interval row, input 2 in the text field.</li>
            </ol>
            <p>
              Next, let’s configure OBS to point to Livepeer.com’s RTMP ingest
              data centers.
            </p>
            <ol>
              <li>In the Setting sidebar menu, select Stream.</li>
              <li>At the top, select Custom from the Service dropdown menu.</li>
              <li>
                Input{" "}
                <span
                  style={{
                    cursor: "pointer",
                    color: "tan",
                    fontSize: "inherit",
                  }}
                  title="click to copy"
                  onClick={(e) => clickToCopy(e)}
                >
                  rtmp://rtmp.livepeer.com/live
                </span>{" "}
                in the Server text field.
              </li>
              <li>
                Navigate to the stream detail page, click the “Reveal stream
                key” button, and copy the stream key.
              </li>
              <li>
                Navigate back to OBS, and paste your stream key into the Stream
                Key text field.
              </li>
              <li>Confirm the Use Authentication checkbox is unchecked.</li>
              <li>
                Click OK in the lower right corner to save your updated server
                and keyframe interval settings.
              </li>
            </ol>
            <p>
              When you are ready to start your live stream, click Start
              Streaming in the lower right corner of OBS.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
