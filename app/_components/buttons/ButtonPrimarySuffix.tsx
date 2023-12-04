import React from "react";
import Image from "next/image";
import { ButtonType, OptionType } from "@/app/_redux/stores/options-slice";

type ButtonProps = {
  text: string;

  /**
   * @prop must be "play" | "pause" | "completed"
   */
  iconType: "play" | "pause" | "completed";
  option?: OptionType;
  activeButton: ButtonType;
  onClickEvent?: (option: OptionType) => void;
  current: OptionType | null;
};

const ButtonPrimary: React.FunctionComponent<ButtonProps> = ({
  text,
  iconType,
  option,
  activeButton,
  onClickEvent,
  current,
}) => {
  const bgColor = () => {
    let result = "#D3E7FF";
    if (current && current?.id === option?.id && option?.isPlaying) {
      result = "#B4D6FF";
    } else {
      result = !option?.isPlayed ? "#D3E7FF" : "#E5E5E5";
    }
    return result;
  };

  const borderColor =
    iconType === "play" || iconType === "pause" ? "border-blueMedium" : "";

  const hoverEffect = !option?.isPlayed
    ? "hover:tw-bg-blueSoft hover:tw-border-secondary"
    : option.isPlayed && option.suggestions.length
    ? "hover:tw-bg-grayLight"
    : "";

  const handleClick = () => {
    if (onClickEvent && option) {
      onClickEvent(option);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: bgColor() }}
      className={`${borderColor} ${hoverEffect} tw-w-full tw-min-w-max tw-px-4 tw-py-[15.5px] tw-rounded-lg tw-border-[0.5px] tw-flex tw-justify-start tw-items-center tw-gap-x-[12.5px] md:tw-justify-between md:tw-gap-0 tw-transition-all tw-duration-300`}
    >
      <span
        className={
          iconType === "completed" ? "tw-text-grayDark" : "tw-text-primary"
        }
      >
        {text}
      </span>
      <Image
        src={`/assets/${iconType}-vector.svg`}
        alt="play"
        width={0}
        height={0}
        style={{ width: "auto", height: "auto", flexShrink: 0 }}
      />
    </button>
  );
};

export default ButtonPrimary;
