import { useState, useEffect } from "react";
import dataJSON from "@/app/_resources/data.json";
import MainHeader from "../MainHeader";
import MainVideoFrame from "../MainVideoFrame";
import MainOptions from "../MainMobileOptions";
import { ButtonType, OptionType } from "../../_redux/stores/options-slice";

const MobileLayout = ({ appVersion }: { appVersion: string }) => {
  const [buttons, setButtons] = useState<ButtonType[]>(dataJSON);
  const [activeButton, setActiveButton] = useState<ButtonType | null>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const shuffled: ButtonType[] = [];
    dataJSON.forEach((button) => {
      button.buttonOptions.map((option) => {
        const randomIdx = Math.floor(Math.random() * option.suggestions.length);
        option.url = option.suggestions[randomIdx].url;
      });
      shuffled.push(button);
    });
    setButtons(shuffled);
  }, []);

  const handleButtonClick = (button: ButtonType) => {
    setActiveButton(button);
    setCurrent(null);
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
      const previous = activeButton?.buttonOptions.find((item) => {
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
      if (!prev) return null;
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
        const suggestions =
          activeButton!.buttonOptions[optionIdx].suggestions.slice();
        const randomIdx = Math.floor(Math.random() * suggestions.length);
        if (suggestions.length) {
          updatedOptions[optionIdx].url = suggestions[randomIdx].url;
          updatedOptions[optionIdx].isPlayed = true;
          updatedOptions[optionIdx].suggestions.splice(randomIdx, 1);
          setActiveButton((prev) => {
            if (!prev) return null;
            return {
              ...prev,
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
      <section className="tw-flex tw-justify-center tw-text-[10px]">
        {appVersion}
      </section>
    </div>
  );
};

export default MobileLayout;
