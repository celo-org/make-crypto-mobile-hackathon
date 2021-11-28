import React from "react";
import "../style/Navbar.css";

export default function Navbarx({ routeChange }) {
  const handel_logout = () => {
    window.localStorage.removeItem("currentuser");
    window.alert("User signed out");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <div className="navbar_left">
        <div
          style={{ textDecoration: "none", color: "white" }}
          onClick={() => routeChange("/")}
        >
          StreamEzy
        </div>
      </div>
      <div className="navbar_right">
        <div
          style={{ textDecoration: "none" }}
          onClick={() => routeChange("/about")}
        >

          <div title="About Us" className="navbar_icons navbar_user">
            <i className="navbar_icons fas fa-question-circle"></i>
          </div>
        </div>

        {
        window.localStorage.getItem("currentuser") && (
          <div style={{ textDecoration: "none" }} onClick={handel_logout}>
            <div title="Log Out" className="navbar_icons navbar_user">
              <i
                className="navbar_icons fas fa-sign-out-alt"
                area-hidden="true"
              ></i>
            </div>
          </div>
        )
        }


        {
        window.localStorage.getItem("currentuser") && (
          <div
            style={{ textDecoration: "none" }}
            onClick={() => routeChange("/profile")}
          >
            <div title="Profile" className="navbar_icons navbar_user">
              <i className="navbar_icons far fa-user-circle"></i>
            </div>
          </div>
        )
        }


        {
        !window.localStorage.getItem("currentuser") && (
          <div
            style={{ textDecoration: "none" }}
            onClick={() => routeChange("/login")}
          >
            <div title="Sign In" className="navbar_icons navbar_user">
              <i className="fas fa-sign-in-alt"></i>
            </div>
          </div>
        )
        }

        {
        !window.localStorage.getItem("currentuser") && (
          <div
            style={{ textDecoration: "none" }}
            onClick={() => routeChange("/signup")}
          >
            <div title="Register" className="navbar_icons navbar_user">
              <i className="navbar_icons fas fa-user-plus"></i>
            </div>
          </div>
        )
        }

        
        <div
          style={{ textDecoration: "none" }}
          onClick={() => routeChange("/")}
        >
          <div
            title="Notifications"
            className="navbar_icons navbar_notification"
          >
            <i className="far fa-bell"></i>
            <div className="navbar_notificationCount">5</div>
          </div>
        </div>

        <div
          style={{ textDecoration: "none" }}
          onClick={() => routeChange("/golive")}
        >
          <div title="Go Live" className="navbar_icons navbar_user">
            <i className="navbar_icons fas fa-satellite-dish"></i>
          </div>
        </div>

        <div
          style={{ textDecoration: "none" }}
          onClick={() => routeChange("/upload")}
        >
          <div title="Upload Video" className="navbar_icons navbar_user">
            <i className="fas fa-video"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
