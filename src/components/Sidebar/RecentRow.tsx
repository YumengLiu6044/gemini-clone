import { assets } from "../../assets/assets";

interface RecentRowProps {
  summary: string;
  onTrashClick: () => void
}

const RecentRow = ({ summary, onTrashClick }: RecentRowProps) => {
  return (
    <div>
      <div className="recent-entry">
        <img src={assets.message_icon} />
        <p>{summary}</p>
        <img src={assets.trash_icon} className="trash-icon" onClick={onTrashClick}/>
      </div>
    </div>
  );
};

export default RecentRow;
