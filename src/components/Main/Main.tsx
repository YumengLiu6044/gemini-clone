import "./Main.css";
import { assets } from "../../assets/assets";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import Greet from "../Greet/Greet";
import Chat from "../Chat/Chat";
import Sidebar from "../Sidebar/Sidebar";

type HistoryArray = {
  role: string;
  parts: {
    text: string;
  }[];
}[];

function Main() {
  const [historyList, setHistoryList] = useState<HistoryArray[]>([[]]);
  const [summaryList, setSummaryList] = useState<string[]>(["New summary"]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [queryString, setQueryString] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function getResponse(query: string) {
    if (isLoading) {
      return;
    }
    let chatHistory = historyList[selectedIndex];
    const prompt = query;
    if (prompt.length === 0) {
      return;
    }
    setIsLoading(true);

    const chat = model.startChat({
      history: chatHistory,
    });

    const userMessage = {
      role: "user",
      parts: [{ text: prompt }],
    };
    const updatedHistory = [...chatHistory, userMessage];

    if (updatedHistory.length === 1) {
      let copySummaryList = summaryList;
      copySummaryList[selectedIndex] = prompt;
      setSummaryList(copySummaryList);
    }

    handleArrayMutation(updatedHistory);
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
      handleArrayMutation(finalHistory);
    }
    setIsLoading(false);
  }

  function handleArrayMutation(newElement: HistoryArray) {
    const newArray = [...historyList];
    newArray[selectedIndex] = newElement;
    setHistoryList(newArray);
  }

  function handleChatRemoval(removeIndex: number) {
    if (isLoading) {
      return;
    }
    console.log("clicked removal");
    if (historyList.length === 1) {
      setSummaryList(["New chat"]);
      setHistoryList([[]]);
      return;
    }
    setSelectedIndex(0);
    setSummaryList(
      summaryList.filter((_, index) => {
        return index != removeIndex;
      })
    );
    setHistoryList(
      historyList.filter((_, index) => {
        return index != removeIndex;
      })
    );
  }

  function handleNewChatClick() {
    if (isLoading) {
      return;
    }
    if (historyList[0].length === 0) {
      console.log("returned on empty history");
      return;
    }

    setSummaryList(["summary new", ...summaryList]);
    setHistoryList([[], ...historyList]);
    setSelectedIndex(0);

    console.log(`New history list length: ${historyList.length}`);
  }

  const showGreet =
    selectedIndex <= historyList.length &&
    historyList[selectedIndex].length === 0 ? (
      <Greet
        onClickCard={(prompt: string) => {
          setQueryString("");
          getResponse(prompt);
        }}
      />
    ) : (
      <Chat chatHistory={historyList[selectedIndex]} />
    );

  return (
    <>
      <Sidebar
        summaryList={summaryList}
        onTrashClick={handleChatRemoval}
        onNewChatClick={handleNewChatClick}
        onRecentRowClick={(newIndex: number) => {
          console.log(`clicked recent row at ${newIndex}`);
          setSelectedIndex(newIndex);
        }}
      />
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
                  setQueryString("");
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
                  setQueryString("");
                  getResponse(queryString);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
