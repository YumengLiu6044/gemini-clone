import { assets } from "../../assets/assets";

interface RecentRowProps {
  summary: string;
  onTrashClick: () => void
  onRecentRowClick: () =>void
  id: string
}

const RecentRow = ({ summary, onTrashClick, onRecentRowClick, id }: RecentRowProps) => {
  return (
    <div id={id} onClick={onRecentRowClick}>
      <div className="recent-entry">
        <img src={assets.message_icon} />
        <p>{summary}</p>
        <img src={assets.trash_icon} className="trash-icon" onClick={(event) => {
          event.stopPropagation();
          onTrashClick();
          }}/>
      </div>
    </div>
  );
};

export default RecentRow;
