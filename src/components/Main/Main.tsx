import "./Main.css";
import { assets } from "../../assets/assets";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import Greet from "../Greet/Greet";
import Chat from "../Chat/Chat";

interface History {
  chatHistory: {
    role: string;
    parts: {
      text: string;
    }[];
  }[];
}

function Main() {
  const [queryString, setQueryString] = useState("");
  const [chatHistory, setChatHistory] = useState<History>({ chatHistory: [] });
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDYDk_Cc3YVKUPCj_7Bm7LsmaZwQbR7l-w"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function getResponse(query: string) {
    const prompt = query;
    if (prompt.length === 0) {
      return;
    }

    setQueryString("");

    const chat = model.startChat({
      history: chatHistory.chatHistory,
    });

    const userMessage = {
      role: "user",
      parts: [{ text: prompt }],
    };
    const updatedHistory = [...chatHistory.chatHistory, userMessage];

    setChatHistory({
      chatHistory: updatedHistory,
    });

    setIsLoading(true);

    const result = await chat.sendMessageStream(prompt);
    let response = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      response += chunkText;
      const modelMessage = {
        role: "model",
        parts: [{ text: response }],
      };
      const finalHistory = [...updatedHistory, modelMessage];
      setChatHistory({ chatHistory: finalHistory });
    }
  }

  const showGreet =
    chatHistory.chatHistory.length === 0 ? (
      <Greet
        onClickCard={(prompt: string) => {
          getResponse(prompt);
        }}
      />
    ) : (
      <Chat chatHistory={chatHistory.chatHistory} isLoading={isLoading} />
    );

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user profile picture" />
      </div>

      <div className="main-container">
        {showGreet}
        <div className="input-area">
          <input
            type="text"
            className="query-box"
            placeholder="Write your prompt here"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getResponse(queryString);
              }
            }}
            onSubmit={() => {
              getResponse(queryString);
            }}
          />
          <div className="trailing-symbols">
            <img src={assets.gallery_icon} alt="pictures" />
            <img src={assets.mic_icon} alt="pictures" />
            <img
              src={assets.send_icon}
              alt="pictures"
              onClick={() => {
                getResponse(queryString);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
