import MainVideoFrame from "../MainVideoFrame";
import MainHeader from "../MainHeader";
import MainDesktopOptions from "../MainDesktopOptions";
import { useState, useEffect } from "react";
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
      setActiveButton((prev) => {
        return {
          ...prev,
          buttonOptions: prev?.buttonOptions?.map((item) => {
            if (item.id !== option.id) {
              return item;
            }
            return {
              ...item,
              isPlayed: true,
            };
          }),
        };
      });
      setIsVisible(option);
    } else {
      if (current !== option.id) {
        setActiveButton((prev) => {
          return {
            ...prev,
            buttonOptions: prev?.buttonOptions?.map((item) => {
              if (item.id !== current) {
                return item;
              }
              return {
                ...item,
                isPlayed: true,
              };
            }),
          };
        });
      }
      const previous = activeButton.buttonOptions.find((item) => {
        return item.id === current;
      });
      if (previous) {
        setIsVisible(previous);
      }
      setCurrent(option.id);
    }
  };

  const handleVideoEnd = () => {
    const matched = activeButton?.buttonOptions?.find((item) => {
      return item.id === current;
    });
    if (matched) {
      setActiveButton((prev) => {
        return {
          ...prev,
          buttonOptions: prev?.buttonOptions?.map((item) => {
            if (item.id !== matched.id) {
              return item;
            }
            return {
              ...item,
              isPlayed: true,
            };
          }),
        };
      });
      setIsVisible(matched);
    }
    setCurrent(null);
  };

  const setIsVisible = (option: OptionType) => {
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
      style={{ height: "100vh" }}
      className="tw-grid tw-grid-cols-2 tw-place-items-stretch"
    >
      <section className="tw-flex tw-flex-col md:tw-px-[25px] xl:tw-px-[50px]">
        <MainHeader />
        <MainVideoFrame
          activeButton={activeButton}
          current={current}
          onVideoEnd={handleVideoEnd}
        />
      </section>
      <section className="tw-grid tw-auto-rows-min tw-place-content-center md:tw-px-[50px] xl:tw-px-[157.5px]">
        <MainDesktopOptions
          buttons={buttons}
          activeButton={activeButton}
          current={current}
          handleButtonClick={handleButtonClick}
          handleOptionClick={handleOptionClick}
        />
      </section>
      <section className="tw-col-span-2 tw-flex tw-justify-end tw-pr-[157.5px] tw-text-[10px]">
        {appVersion}
      </section>
    </div>
  );
};

export default DesktopLayout;
