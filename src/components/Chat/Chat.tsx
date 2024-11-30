import Markdown from "react-markdown";
import "./Chat.css";
import { useEffect, useRef } from "react";
import { assets } from "../../assets/assets";

interface ChatProps {
  chatHistory: {
    role: string;
    parts: {
      text: string;
    }[];
  }[];

  isLoading: boolean
}

const Chat = ({ chatHistory, isLoading }: ChatProps) => {
  const listRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [chatHistory]);

  const chatRow = chatHistory.map((chat, index) => {
    return (
      <div className="chat-row" key={String(index)}>
        <img
          src={chat.role === "user" ? assets.user_icon : assets.gemini_icon}
        />
        <Markdown className="response">{chat.parts[0].text}</Markdown>
      </div>
    );
  });

  return (
    <div className="chat-section" ref={listRef}>
      {chatRow}
    </div>
  );
};

export default Chat;
