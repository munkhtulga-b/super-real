import React from "react";

type ButtonProps = {
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  text: string;
  iconType: "play" | "pause" | "completed";
};

const ButtonPrimary: React.FunctionComponent<ButtonProps> = ({
  bgColor,
  textColor,
  borderColor,
  text,
  iconType,
}) => {
  const colorCombition = (): { bgColor: string; borderColor: string } => {
    let result = { bgColor: "#D3E7FF", borderColor: "#C7D7FF" };
    if (bgColor && borderColor && iconType) {
      result.bgColor = bgColor;
      result.borderColor = borderColor;
    }
    if (!bgColor && !borderColor && iconType && iconType == "completed") {
      result.bgColor = "#F0F0F0";
      result.borderColor = "#E5E5E5";
    }
    return result;
  };

  return (
    <button
      style={{
        backgroundColor: colorCombition().bgColor,
        color: textColor ? textColor : "#2B5BD3",
        borderColor: colorCombition().borderColor,
      }}
      className="tw-px-4 tw-py-[15.5px] tw-rounded-lg tw-border-[0.5px]"
    >
      {text}
    </button>
  );
};

export default ButtonPrimary;
