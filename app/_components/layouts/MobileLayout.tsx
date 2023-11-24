import { useState, useEffect } from "react";
import dataJSON from "@/app/_resources/data.json";
import MainHeader from "../MainHeader";
import MainVideoFrame from "../MainVideoFrame";
import MainOptions from "../MainMobileOptions";
import { useDispatch } from "react-redux";
import {
  ButtonType,
  OptionType,
  updateCurrent,
} from "../../_redux/stores/options-slice";

const MobileLayout = ({ appVersion }: { appVersion: string }) => {
  const [buttons, setButtons] = useState<ButtonType[]>(dataJSON);
  const [activeButton, setActiveButton] = useState<ButtonType | null>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const handleButtonClick = (button: ButtonType) => {
    setActiveButton(button);
  };

  const handleOptionClick = (option: OptionType) => {
    if (current && current === option.id) {
      setCurrent(null);
      setActiveButton((prev) => {
        if (!prev) return null;

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
      setCurrent(option.id);
    }
  };

  const handleVideoEnd = () => {
    const matched = activeButton?.buttonOptions?.find((item) => {
      return item.id === current;
    });
    if (matched) {
      setActiveButton((prev) => {
        if (!prev) return null;

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
        if (!prev) return null;

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
        activeButton!.buttonSuggestions[randomIdx].text = option.text;
        updatedOptions.splice(
          optionIdx,
          1,
          activeButton!.buttonSuggestions[randomIdx]
        );
        if (activeButton?.buttonSuggestions.length) {
          suggestions.splice(randomIdx, 1);
          setActiveButton((prev) => {
            if (!prev) return null;
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

  const handleReturn = () => {
    setActiveButton(null);
    setCurrent(null);
  };

  return (
    <div className="tw-grid tw-grid-cols-1 tw-auto-rows-min">
      <MainHeader />
      <MainVideoFrame
        activeButton={activeButton}
        current={current}
        onVideoEnd={handleVideoEnd}
      />
      <MainOptions
        buttons={buttons}
        activeButton={activeButton}
        current={current}
        handleButtonClick={handleButtonClick}
        handleOptionClick={handleOptionClick}
        handleReturn={handleReturn}
      />
      <section className="tw-flex tw-justify-center">{appVersion}</section>
    </div>
  );
};

export default MobileLayout;
