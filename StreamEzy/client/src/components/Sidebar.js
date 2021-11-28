import React from "react";
import "../style/Sidebar.css";
import { MusicNoteBeamed, PhoneFill, TrophyFill } from "react-bootstrap-icons";

export default function Sidebar({ routeChange }) {
  return (
    <div id="sidebar">
      <p onClick={() => routeChange("/")}>
        <MusicNoteBeamed style={{ color: "gold", fontSize: "2rem" }} />{" "}
        <span>Music</span>
      </p>
      <p onClick={() => routeChange("/")}>
        <TrophyFill style={{ color: "tomato", fontSize: "2rem" }} />{" "}
        <span>Sport</span>
      </p>
      <p onClick={() => routeChange("/")}>
        <PhoneFill style={{ color: "pink", fontSize: "2rem" }} />{" "}
        <span>Gaming</span>
      </p>
    </div>
  );
}
