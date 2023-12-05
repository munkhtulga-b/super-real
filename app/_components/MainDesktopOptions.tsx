"use client";

import ButtonOutlined from "./buttons/ButtonOutlined";
import ButtonPrimarySuffix from "./buttons/ButtonPrimarySuffix";
import ButtonSecondary from "./buttons/ButtonSecondary";
import { ButtonType, OptionType } from "../_redux/stores/options-slice";

interface DesktopOptionsProp {
  buttons: ButtonType[];
  activeButton: ButtonType;
  current: OptionType | null;
  handleButtonClick: (button: ButtonType) => void;
  handleOptionClick: (option: OptionType) => void;
}

const MainDesktopOptions: React.FunctionComponent<DesktopOptionsProp> = ({
  buttons,
  activeButton,
  current,
  handleButtonClick,
  handleOptionClick,
}) => {
  const handleIconType = (option: OptionType) => {
    let result: "gray-play" | "gray-pause" | "play" | "pause" | "completed" =
      "play";
    if (!option.isPlayed) {
      result =
        current?.id === option.id && current?.isPlaying ? "pause" : "play";
    } else {
      result =
        current?.id === option.id && current.isPlaying
          ? "gray-pause"
          : current?.id === option.id && !current?.isPlaying
          ? "gray-play"
          : "completed";
    }
    return result;
  };

  return (
    <div className="tw-w-fit tw-h-auto tw-flex tw-flex-col tw-z-10">
      <p
        key={"placeholder"}
        className="tw-text-lg tw-text-grayDark tw-px-4 tw-h-[27px]"
      >
        何を聞きたいですか？
      </p>
      <div className="tw-rounded-[24px] tw-shadow tw-py-[25px] tw-min-h-[450px] tw-bg-white tw-mt-5">
        <section className="tw-px-[22px]">
          <ul className="tw-m-0 tw-flex tw-justify-start tw-items-center tw-w-full tw-gap-2">
            {buttons.map((button) => {
              return (
                <li
                  key={button.buttonId}
                  onClick={() => handleButtonClick(button)}
                >
                  <ButtonOutlined
                    activeButton={activeButton}
                    text={button.buttonText}
                    button={button}
                  />
                </li>
              );
            })}
          </ul>
        </section>
        <section className="tw-px-[22px] tw-mt-5">
          <ul className="tw-m-0 tw-grid tw-grid-cols-1 tw-auto-rows-min tw-gap-y-3">
            {activeButton?.buttonOptions.map((option) => {
              return (
                <li onClick={() => handleOptionClick(option)} key={option.id}>
                  <ButtonPrimarySuffix
                    iconType={handleIconType(option)}
                    key={option.id}
                    text={option.text}
                    option={option}
                    activeButton={activeButton}
                    onClickEvent={() => handleOptionClick(option)}
                    current={current}
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
