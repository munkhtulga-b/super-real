import React from "react";

type ButtonProps = {
  bgColor?: string;
  textColor?: string;
  text: string;
};

const ButtonPrimary: React.FunctionComponent<ButtonProps> = ({
  bgColor,
  textColor,
  text,
}) => {
  return (
    <button
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
