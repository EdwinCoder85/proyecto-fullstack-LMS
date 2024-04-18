import { FC, MouseEventHandler} from "react";
import { IconType } from "react-icons";

interface ButtonIconProps {
  icon: IconType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const ButtonIcon: FC<ButtonIconProps> = ({ icon: Icon, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-4 bg-gray-100 rounded-xl text-primary border-2 border-transparent hover:border-primary transition-colors duration-300"
    >
      <Icon />
    </button>
  );
};

export default ButtonIcon;
