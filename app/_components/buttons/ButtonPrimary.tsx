import { ButtonType } from "@/app/_redux/stores/options-slice";
import React from "react";

type ButtonProps = {
  bgColor?: string;
  textColor?: string;
  text: string;
  onClickEvent: (button: ButtonType) => void;
  button: ButtonType;
};

const ButtonPrimary: React.FunctionComponent<ButtonProps> = ({
  bgColor,
  textColor,
  text,
  onClickEvent,
  button,
}) => {
  const handleClick = () => {
    onClickEvent(button);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: bgColor ? bgColor : "#D3E7FF",
        color: textColor ? textColor : "#2B5BD3",
      }}
      className="tw-snap-center tw-px-4 tw-py-[15.5px] tw-rounded-lg tw-border-[0.5px] tw-border-blueMedium"
    >
      {text}
    </button>
  );
};

export default ButtonPrimary;
