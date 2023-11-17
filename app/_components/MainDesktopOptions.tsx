"use client";

import { useState, useEffect } from "react";
import ButtonOutlined from "./buttons/ButtonOutlined";
import ButtonPrimarySuffix from "./buttons/ButtonPrimarySuffix";
import ButtonSecondary from "./buttons/ButtonSecondary";
import { buttons, options, OptionType, DataType } from "../_data/desktop";

const MainDesktopOptions = () => {
  const [activeButtonId, setActiveButtonId] = useState(buttons[0].id);
  const [activeOptions, setActiveOptions] = useState(options["button1"]);
  const handleButtonClick = (buttonId: number): void => {
    const video = document.querySelector("#video-tag") as HTMLVideoElement;
    video.pause();
    const resetOptions = options[`button${buttonId}` as keyof DataType].map(
      (item) => {
        return {
          ...item,
          isPlaying: false,
        };
      }
    );
    setActiveButtonId(buttonId);
    setActiveOptions(resetOptions);
  };

  const handleOptionClick = (option: OptionType) => {
    const video = document.querySelector("#video-tag") as HTMLVideoElement;
    if (option.isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    const updatedOptions: OptionType[] = activeOptions.map((item) => {
      if (item.id === option.id) {
        item.isPlaying ? (item.isPlaying = false) : (item.isPlaying = true);
      }
      return item;
    });
    setActiveOptions(updatedOptions);
  };

  const optionIconType = (
    isPlaying: boolean
  ): "play" | "pause" | "completed" => {
    let result: "play" | "pause" | "completed" = "play";
    if (isPlaying) {
      result = isPlaying ? "pause" : "play";
    }
    return result;
  };

  return (
    <div className="tw-w-fit tw-h-auto tw-flex tw-flex-col">
      <div className="tw-rounded-[24px] tw-shadow tw-py-[25px] tw-mt-[225px]">
        <section className="tw-px-[22px]">
          <ul className="tw-m-0 tw-flex tw-justify-start tw-items-center tw-w-full tw-gap-2">
            {buttons.map((button) => {
              return (
                <li
                  key={button.id}
                  onClick={() => handleButtonClick(button.id)}
                >
                  <ButtonOutlined
                    text={button.text}
                    buttonId={button.id}
                    activeButtonId={activeButtonId}
                  />
                </li>
              );
            })}
          </ul>
        </section>
        <section className="tw-px-[42.5px] tw-mt-5">
          <ul className="tw-m-0 tw-grid tw-grid-cols-1 tw-auto-rows-min tw-gap-y-3">
            {activeOptions.map((option) => {
              return (
                <li onClick={() => handleOptionClick(option)} key={option.id}>
                  <ButtonPrimarySuffix
                    text={option.text}
                    iconType={optionIconType(option.isPlaying ?? false)}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <div className="tw-mt-[46.5px] tw-px-[57.5px] tw-flex tw-justify-center">
        <section className="tw-w-[215px]">
          <ButtonSecondary />
        </section>
      </div>
    </div>
  );
};

export default MainDesktopOptions;
