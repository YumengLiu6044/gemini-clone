import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import RecentRow from "./RecentRow";

interface SidebarProps {
  summaryList: string[];
  onTrashClick: (index: number) => void;
  onNewChatClick: () => void;
  onRecentRowClick: (index: number) => void;
}

function Sidebar({
  summaryList,
  onTrashClick,
  onNewChatClick,
  onRecentRowClick,
}: SidebarProps) {
  const [showDetail, setShowDetail] = useState(true);

  const handleMenuClick = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt="menu"
          onClick={handleMenuClick}
        />
        <div className="new-chat" onClick={onNewChatClick}>
          <img src={assets.plus_icon} />
          {showDetail && <p>New Chat</p>}
        </div>
        {showDetail && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {summaryList.map((item, index) => {
              return (
                <RecentRow
                  id={String(index)}
                  summary={item}
                  onTrashClick={() => {
                    onTrashClick(index);
                  }}
                  onRecentRowClick={() => {
                    onRecentRowClick(index);
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question mark" />
          {showDetail && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history" />
          {showDetail && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {showDetail && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
