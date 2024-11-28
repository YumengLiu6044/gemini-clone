import React from "react";
import { assets } from "../../assets/assets";

function Greet() {
  return (
    <>
      <div className="greet">
        <p>
          <span>Hello, Yumeng</span>
        </p>
        <p>How can I help you today?</p>
      </div>
      <div className="cards">
        <div className="card">
          <p>Suggest beautiful places to see on an upcoming road trip</p>
          <img src={assets.compass_icon} alt="compass" />
        </div>
        <div className="card">
          <p>Briefly summarize this concept: urban planning</p>
          <img src={assets.bulb_icon} alt="light bulb" />
        </div>
        <div className="card">
          <p>Brain storm team bonding activities for our work retreat</p>
          <img src={assets.message_icon} alt="message" />
        </div>
        <div className="card">
          <p>Improve the readability of the following code</p>
          <img src={assets.code_icon} alt="code" />
        </div>
      </div>
    </>
  );
}

export default Greet;
