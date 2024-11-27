import React from "react";
import "./Main.css";
import { assets } from "../../assets/assets";

function Main() {
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user profile picture" />
      </div>

      <div className="main-container">
        <div className="greet">
          <p>
            <span>Hello, Dev.</span>
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
        <div className="input-area">
          <input
            type="text"
            className="query-box"
            placeholder="Enter prompt here"
          />
          <div className="trailing-symbols">
            <img src={assets.gallery_icon} alt="pictures"/>
            <img src={assets.mic_icon} alt="pictures"/>
            <img src={assets.send_icon} alt="pictures"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
