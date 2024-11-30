import React, { MouseEventHandler } from "react";
import { assets } from "../../assets/assets";

interface GreetProps {
  onClickCard: (prompt: string) => void;
}

function Greet({ onClickCard }: GreetProps) {
  return (
    <>
      <div className="greet">
        <p>
          <span>Hello, Yumeng</span>
        </p>
        <p>How can I help you today?</p>
      </div>
      <div className="cards">
        <div
          className="card"
          onClick={() => {
            onClickCard(
              "Suggest beautiful places to see on an upcoming road trip"
            );
          }}
        >
          <p>Suggest beautiful places to see on an upcoming road trip</p>
          <img src={assets.compass_icon} alt="compass" />
        </div>
        <div
          className="card"
          onClick={() => {
            onClickCard(
              "Briefly summarize this concept: urban planning"
            );
          }}
        >
          <p>Briefly summarize this concept: urban planning</p>
          <img src={assets.bulb_icon} alt="light bulb" />
        </div>
        <div
          className="card"
          onClick={() => {
            onClickCard(
              "Brain storm team bonding activities for our work retreat"
            );
          }}
        >
          <p>Brain storm team bonding activities for our work retreat</p>
          <img src={assets.message_icon} alt="message" />
        </div>
        <div
          className="card"
          onClick={() => {
            onClickCard(
              "Improve the readability of the following code"
            );
          }}
        >
          <p>Improve the readability of the following code</p>
          <img src={assets.code_icon} alt="code" />
        </div>
      </div>
    </>
  );
}

export default Greet;
