import Image from "next/image";
import MainVideoFrame from "../MainVideoFrame";
import MainHeader from "../MainHeader";
import MainDesktopOptions from "../MainDesktopOptions";
import { useState } from "react";
import dataJSON from "@/app/_resources/data.json";
import { ButtonType, OptionType } from "../../_redux/stores/options-slice";

const DesktopLayout = ({ appVersion }: { appVersion: string }) => {
  const [buttons, setButtons] = useState<ButtonType[]>(dataJSON);
  const [activeButton, setActiveButton] = useState<ButtonType>(buttons[0]);
  const [current, setCurrent] = useState<number | null>(null);

  const handleButtonClick = (button: ButtonType) => {
    setActiveButton(button);
  };

  const handleOptionClick = (option: OptionType) => {
    if (current && current === option.id) {
      setCurrent(null);
      updateActiveButton(option.id);
      updateIsVisible(option);
    } else {
      if (current !== option.id) {
        updateActiveButton(current);
      }
      const previous = activeButton.buttonOptions.find((item) => {
        return item.id === current;
      });
      if (previous) {
        updateIsVisible(previous);
      }
      setCurrent(option.id);
    }
  };

  const handleVideoEnd = () => {
    const matched = activeButton?.buttonOptions?.find((item) => {
      return item.id === current;
    });
    if (matched) {
      updateActiveButton(matched.id);
      updateIsVisible(matched);
    }
    setCurrent(null);
  };

  const updateActiveButton = (optionId: number | null) => {
    setActiveButton((prev) => {
      return {
        ...prev,
        buttonOptions: prev?.buttonOptions?.map((item) => {
          if (item.id !== optionId) {
            return item;
          }
          return {
            ...item,
            isPlayed: true,
          };
        }),
      };
    });
  };
  const updateIsVisible = (option: OptionType) => {
    setTimeout(() => {
      setActiveButton((prev) => {
        return {
          ...prev,
          buttonOptions: prev?.buttonOptions?.map((item) => {
            if (item.id !== option.id) {
              return item;
            }
            return {
              ...item,
              isVisible: false,
            };
          }),
        };
      });
      const optionIdx = activeButton?.buttonOptions.findIndex(
        (item) => item.id === option.id
      );
      const updatedOptions = [...activeButton!.buttonOptions];
      if (optionIdx !== undefined && optionIdx !== -1) {
        const suggestions = [...activeButton!.buttonSuggestions];
        const randomIdx = Math.floor(Math.random() * suggestions.length);
        if (activeButton?.buttonSuggestions.length) {
          activeButton!.buttonSuggestions[randomIdx].text = option.text;
          activeButton!.buttonSuggestions[randomIdx].isPlayed = true;
        }
        updatedOptions.splice(
          optionIdx,
          1,
          activeButton!.buttonSuggestions[randomIdx]
        );
        if (activeButton?.buttonSuggestions.length) {
          suggestions.splice(randomIdx, 1);
          setActiveButton((prev) => {
            return {
              ...prev,
              buttonSuggestions: suggestions,
              buttonOptions: updatedOptions,
            };
          });
        }
      }
    }, 500);
  };

  return (
    <div
      style={{ maxHeight: "100vh", minHeight: "100vh", overflow: "hidden" }}
      className="tw-grid tw-grid-cols-2 tw-place-items-stretch"
    >
      <section className="tw-flex tw-flex-col tw-justify-between md:tw-px-[25px] xl:tw-px-[50px]">
        <MainHeader />
        <MainVideoFrame
          activeButton={activeButton}
          current={current}
          onVideoEnd={handleVideoEnd}
        />
      </section>
      <section className="tw-grid tw-auto-rows-min tw-place-content-center md:tw-px-[50px] xl:tw-px-[157.5px] tw-relative">
        <MainDesktopOptions
          buttons={buttons}
          activeButton={activeButton}
          current={current}
          handleButtonClick={handleButtonClick}
          handleOptionClick={handleOptionClick}
        />
        <Image
          priority
          src="/assets/group-bubbles.svg"
          alt="bubbles"
          width={0}
          height={0}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            zIndex: "0",

            width: "100%",
            height: "100%",
          }}
        />
        <span className="tw-absolute tw-bottom-10 tw-right-10 tw-text-[10px]">
          {appVersion}
        </span>
      </section>
    </div>
  );
};

export default DesktopLayout;
