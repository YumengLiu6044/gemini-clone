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

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDYDk_Cc3YVKUPCj_7Bm7LsmaZwQbR7l-w"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function getResponse() {
    const prompt = queryString;
    if (prompt.length === 0) {
      return;
    }

    // Reset query to empty
    setQueryString("");

    // Prepare the chat model with current history
    const chat = model.startChat({
      history: chatHistory.chatHistory,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    // Add the user's message to the chat history
    const userMessage = { role: "user", parts: [{ text: prompt }] };
    const updatedHistory = [...chatHistory.chatHistory, userMessage];

    // Optimistically update the state to include the user message
    setChatHistory({ chatHistory: updatedHistory });

    // Fetch the model's response
    const result = await chat.sendMessage(prompt);
    const modelMessage = {
      role: "model",
      parts: [{ text: await result.response.text() }],
    };

    // Add the model's response to the chat history
    const finalHistory = [...updatedHistory, modelMessage];

    // Limit history to 10 entries
    if (finalHistory.length > 10) {
      finalHistory.shift();
    }

    setChatHistory({ chatHistory: finalHistory });

    console.log(await result.response.text());
    return result.response.text();
  }

  const showGreet =
    chatHistory.chatHistory.length === 0 ? (
      <Greet />
    ) : (
      <Chat chatHistory={chatHistory.chatHistory} />
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
            onSubmit={getResponse}
          />
          <div className="trailing-symbols">
            <img src={assets.gallery_icon} alt="pictures" />
            <img src={assets.mic_icon} alt="pictures" />
            <img src={assets.send_icon} alt="pictures" onClick={getResponse} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
