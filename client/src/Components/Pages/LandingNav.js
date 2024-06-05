import React from "react";
import "./header.css";
import img from "../images/Logo (4).png";
function LandingNav() {
  return (
    <div className="headermain">
      <div>
        <img src={img}></img>
        <p>Collaborative storytelling platform</p>
      </div>
    </div>
  );
}

export default LandingNav;
