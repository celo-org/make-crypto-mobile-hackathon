import React, { useEffect, useState } from "react";
import "../style/UserProfile.css";
import { doc, getDoc,updateDoc  } from "firebase/firestore";
import { db } from "../firebase";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import VideoCard from "./VideoCard";

export default function UserProfile() {
  const [address, setaddress] = useState(null);
  const [name, setname] = useState("");
  const [dob, setdob] = useState("");
  const [bio, setbio] = useState("");

  const [displayname, setdisplayname] = useState("Loading..");
  const [displaybio, setdisplaybio] = useState("Loading..");
  const [displaydob, setdisplaydob] = useState("Loading..");
  const [displaysubscribe, setdisplaysubscribe] = useState(0);

  const [currentuser, setcurrentuser] = useState(null)

  const loadUserDetails = async () => {
    try {
      const docRef = doc(db, "users", address);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setdisplayname(docSnap.data().name);
      setdisplaysubscribe(docSnap.data().subscribers?.length);
      setdisplaybio(docSnap.data().bio);
      setdisplaydob(docSnap.data().dob);
      window.localStorage.setItem('currentuser',JSON.stringify(docSnap.data()))
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setcurrentuser(JSON.parse(window.localStorage.getItem('currentuser')))
  }, []);

  useEffect(() => {
    if(currentuser){
      setaddress(currentuser.address)
    }
  }, [currentuser]);

  useEffect(() => {
    if(address){
      loadUserDetails();
    }
  }, [address])

  const updateDetails = async (event) => {
    event.preventDefault()
    try {
      const docRef = await updateDoc(doc(db, "users", address), {
        name:name,
        dob:dob,
        bio:bio
      });
      setdob("");
      setname("");
      setbio("");
      loadUserDetails();
      const newU = await getDoc(doc(db,'users',address));
      window.localStorage.setItem('currentuser',JSON.stringify(newU.data()))
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="col-xl-8 col-md-12"
      style={{
        marginLeft: "19rem",
        marginTop: "11rem",
        boxSizing: "border-box",
      }}
    >
      <div className="card user-card-full">
        <div className="row m-l-0 m-r-0">
          <div className="col-sm-4 bg-c-lite-green user-profile">
            <div className="card-block text-center text-white">
              <div className="m-b-25">
                {" "}
                <img
                  src="https://img.icons8.com/bubbles/200/000000/user.png"
                  className="img-radius"
                  alt="User-Profile-Avatar"
                />{" "}
              </div>
              <h6 className="f-w-600">{displayname} </h6>
              <Popup
                trigger={<i className="far fa-edit m-t-10 f-16"></i>}
                // modal
                position="right center"
                closeOnDocumentClick
              >
                <form className="popup-form">
                  <h5>
                    {" "}
                    <b> Edit your details: </b>{" "}
                  </h5>
                  <br />
                  <input
                    name="name"
                    type="text"
                    class="feedback-input"
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Name"
                  />
                  <textarea
                    name="email"
                    type="text"
                    class="feedback-input"
                    onChange={(e) => setbio(e.target.value)}
                    placeholder="Bio"
                  />
                  <input
                    name="dob"
                    class="feedback-input"
                    type="date"
                    onChange={(e) => setdob(e.target.value)}
                    placeholder="Date of Birth"
                  />
                  <input type="submit" onClick={(event)=>updateDetails(event)} value="SUBMIT" />
                </form>
              </Popup>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="card-block">
              <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
              <div className="row">
                <div className="col-sm-6">
                  <p className="m-b-10 f-w-600">Bio</p>
                  <h6 className="text-muted f-w-400">{displaybio} </h6>
                </div>
                <div className="col-sm-6">
                  <p className="m-b-10 f-w-600">D.O.B</p>
                  <h6 className="text-muted f-w-400">{displaydob} </h6>
                </div>
                <div className="col-sm-6">
                  <p className="m-b-10 f-w-600">Location</p>
                  <h6 className="text-muted f-w-400">India</h6>
                </div>
                <div className="col-sm-6">
                  <p className="m-b-10 f-w-600">Email</p>
                  <h6 className="text-muted f-w-400">youremail@gmail.com</h6>
                </div>
              </div>
              <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                Activity on StreamEzy
              </h6>
              <div className="row">
                <div className="col-sm-6">
                  <p className="m-b-10 f-w-600">Subscribers</p>
                  <h6 className="text-muted f-w-400">{displaysubscribe}</h6>
                </div>
                <div className="col-sm-6">
                  <p className="m-b-10 f-w-600">Your Videos</p>

                  <Popup
                    trigger={<h6 className="text-muted f-w-400">click here</h6>}
                    modal
                    // position="top left"
                  >
                    <div className="video-popup">
                      <VideoCard imglink="https://img.youtube.com/vi/uxzv4pRcuKo/0.jpg?resize=153%2C153" title="Top song 2021" />
                      <VideoCard imglink="https://i.ytimg.com/vi/5XtALoenlec/maxresdefault.jpg" title="BGMI Streaming" />
                      <VideoCard imglink="https://www.enwallpaper.com/wp-content/uploads/2021/03/05f0e7541baf6a834905242c1a7aea34.jpg" title="Spiderman Trailer" />
                      <VideoCard imglink="https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg" title="Tajmahal Tour, Agra" />
                    </div>
                  </Popup>
                </div>
              </div>
              <ul className="social-link list-unstyled m-t-40 m-b-10">
                <li>
                  <a
                    href="#!"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title=""
                    data-original-title="facebook"
                    data-abc="true"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title=""
                    data-original-title="twitter"
                    data-abc="true"
                  >
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title=""
                    data-original-title="instagram"
                    data-abc="true"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
