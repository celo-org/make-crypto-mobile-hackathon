import React from "react";
import "../style/About.css";
import "../assets/bg3.jpg";

export default function About({ routeChange }) {
  return (
    <div className="about">
      <div clasName="anime">
        {/* <img src="../assets/bg3.jpg" alt="background"/> */}
        <div className="about-us">
          <div className="who-we-are">
            <h3>Who we are</h3>
            <span>
              A group of software engineers, intrested in developing cool
              projects/websites to help society.
            </span>
          </div>
          <div className="cards">
            <div className="card">
              <div className="card-img card-img1"></div>
              <div className="card-body">
                <h3>Rathin R</h3>
                <span>Web developer</span>
                <p>
               
                Worked on Injecting web3 and 
                Authentication:Validation of Users (Registration and signin). 
                Storing Videos on IPFS(dec. storage) by 
                calling a smart contract and rendering them on Home Page.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-img card-img2"></div>
              <card className="card-body">
                <h3>Tiwari Adarsh</h3>
                <span>Web developer</span>
                <p>
                  MERN stack Developer.Expert in implementation of each step of
                  the project. Eager to learn new technologies and
                  methodologies. Worked on frontend part using React, CSS and
                  JS.
                </p>
              </card>
            </div>

            <div className="card">
              <div className="card-img card-img3"></div>
              <card className="card-body">
                <h3>Ankit Rastogi</h3>
                <span>Web developer</span>
                <p>
                  Worked on the backend part of the project using various tech such as
                  IPFS,Smart Contracts,Livepeer Implemented live streaming feature using Livepeer which is a Ethereumbased protocol that distributes video transcoding work throughout its
                  decentralized network.Worked on smart contracts of uploading videos, and authenticating
                  users using smart contracts.Also worked on IPFS to store Videos and
                  Photos.Worked on frontend part of the project such as Go-Live page, Home
                  Page, View Video Page
                </p>
              </card>
            </div>

            <div className="card">
              <div className="card-img card-img4"></div>
              <card className="card-body">
                <h3>Amritanshu</h3>
                <span>Web developer</span>
                <p>
                  Worked on frontend part using React, CSS and JS, contributed
                  in the backend part in firebase and project planning. Eager to
                  learn new technologies and methodologies.
                </p>
              </card>
            </div>
          </div>

          <div className="social-media">
            <i className="fa fa-github "> </i>
            <i className="fa fa-linkedin "></i>
            <i className="fa fa-twitter "></i>
            <i className="fa fa-facebook "></i>
          </div>
        </div>
        <div style={{ marginLeft: "44%" }}>
          <p>Made with 💖 in India</p>
        </div>
      </div>
    </div>
  );
}
