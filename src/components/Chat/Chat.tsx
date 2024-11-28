import React, { useEffect } from "react";

interface ChatProps {
  chatHistory: {
    role: string;
    parts: {
      text: string;
    }[];
  }[];
}

const Chat = ({ chatHistory }: ChatProps) => {
  const chatRow = chatHistory.map((chat, index) => {
    return <div className="chat-row" key={String(index)}>{chat.parts[0].text}</div>;
  });

  return <div className="chat-section">
    {chatRow}
  </div>;
};

export default Chat;
