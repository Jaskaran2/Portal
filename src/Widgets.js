import React from "react";
import "./Widgets.css";

function Widgets(){
  return (
    <div className="widgets">
      <iframe className="iframe" src="https://kidshealth.org/ETCH/en/parents/coronavirus-questions-answers.html"
      width="340"
      height="100%"
      style={{border:"none",overflow:"hidden"}}
      scrolling="yes"
      farmeborder="0"
      allowTransparency="true"
      allow="encrypted-media"
      ></iframe>
    </div>
  );
}

export default Widgets;
