import React from "react";
import Image from "next/image";

type ButtonProps = {
  text: string;

  /**
   * @prop must be "play" | "pause" | "completed"
   */
  iconType: "play" | "pause" | "completed";
};

const ButtonPrimary: React.FunctionComponent<ButtonProps> = ({
  text,
  iconType,
}) => {
  const bgColor =
    iconType === "play" || iconType === "pause"
      ? "tw-bg-blueLight"
      : "tw-bg-grayMedium";

  const borderColor =
    iconType === "play" || iconType === "pause" ? "border-blueMedium" : "";

  const hoverEffect =
    iconType !== "completed"
      ? "hover:tw-bg-blueSoft hover:tw-border-secondary"
      : "";

  return (
    <button
      className={`${bgColor} ${borderColor} ${hoverEffect} tw-w-full tw-min-w-max tw-px-4 tw-py-[15.5px] tw-rounded-lg tw-border-[0.5px] tw-flex tw-justify-start tw-items-center tw-gap-x-[12.5px] md:tw-justify-between md:tw-gap-0 tw-transition-colors tw-duration-300`}
    >
      <span className="tw-text-primary">{text}</span>
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
