import Markdown from "react-markdown";
import "./Chat.css";
import { assets } from "../../assets/assets";

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
    return (
      <div className="chat-row" key={String(index)}>
        <img src={chat.role === "user" ? assets.user_icon : assets.gemini_icon} />
        <Markdown className="response">{chat.parts[0].text}</Markdown>
      </div>
    );
  });

  return <div className="chat-section">{chatRow}</div>;
};

export default Chat;
