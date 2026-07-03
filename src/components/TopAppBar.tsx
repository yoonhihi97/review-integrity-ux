import { useNavigate } from "react-router-dom";
import Icon from "./Icon";

interface TopAppBarProps {
  title?: string;
  showLogo?: boolean;
  onClose?: () => void;
  rightSlot?: React.ReactNode;
}

export default function TopAppBar({ title, showLogo, onClose, rightSlot }: TopAppBarProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-surface-container-lowest sticky top-0 z-50 w-full flex items-center justify-between px-container-margin h-14 border-b border-outline-variant">
      <button
        aria-label="뒤로가기"
        className="text-primary p-1 rounded-full hover:bg-surface-container transition-colors"
        onClick={() => (onClose ? onClose() : navigate(-1))}
      >
        <Icon name={onClose ? "close" : "arrow_back_ios"} />
      </button>
      {showLogo ? (
        <h1 className="text-primary italic font-black text-lg">Coupang</h1>
      ) : (
        <h1 className="text-headline-sm-mobile text-text-primary">{title}</h1>
      )}
      <div className="w-8 flex justify-end">{rightSlot}</div>
    </header>
  );
}
