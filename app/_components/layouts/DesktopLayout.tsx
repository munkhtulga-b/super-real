import Image from "next/image";
import MainVideoFrame from "../MainVideoFrame";
import MainHeader from "../MainHeader";
import MainDesktopOptions from "../MainDesktopOptions";
import { useEffect, useState } from "react";
import dataJSON from "@/app/_resources/data.json";
import { ButtonType, OptionType } from "../../_redux/stores/options-slice";

const DesktopLayout = ({ appVersion }: { appVersion: string }) => {
  const [buttons, setButtons] = useState<ButtonType[]>(dataJSON);
  const [activeButton, setActiveButton] = useState<ButtonType>(buttons[0]);
  const [current, setCurrent] = useState<OptionType | null>(null);

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
    updateActiveButton(option);
  };

  const handleVideoEnd = () => {
    const matched = activeButton?.buttonOptions?.find((item) => {
      return item.id === current?.id;
    });
    if (matched) {
      updateActiveButton(matched, true);
    }
    setCurrent(null);
  };

  const checkIsPlayed = (shallow: OptionType) => {
    let result = false;
    if (shallow.isPlayed) {
      result = true;
    } else {
      if (!shallow.isPlaying) {
        result = true;
      }
    }
    return result;
  };

  const updateActiveButton = (option: OptionType, isVideoPlayed?: boolean) => {
    const shallow = { ...option };
    shallow.isPlaying = !shallow.isPlaying;
    shallow.isPlayed = checkIsPlayed(shallow);
    if (shallow.isPlayed && shallow.isPlaying && shallow.suggestions.length) {
      const randomIdx = Math.floor(Math.random() * shallow.suggestions.length);
      shallow.url = shallow.suggestions[randomIdx].url;
      shallow.suggestions.splice(randomIdx, 1);
    } else if (!shallow.suggestions.length) {
      ["a", "b", "c"].forEach((item) => {
        shallow.suggestions.push({
          id: shallow.id,
          text: shallow.text,
          url: `https://superreal.reddtech.ai/video/${shallow.id}${item}.json/master.m3u8`,
          isPlaying: shallow.isPlaying,
          isPlayed: shallow.isPlayed,
        });
      });
    }
    setActiveButton((prev) => {
      return {
        ...prev,
        buttonOptions: prev?.buttonOptions?.map((item) => {
          if (item.id !== shallow.id) {
            return item;
          }
          return shallow;
        }),
      };
    });
    setCurrent(shallow);
  };

  return (
    <div
      style={{ maxHeight: "100vh", minHeight: "100vh", overflow: "hidden" }}
      className="tw-grid tw-grid-cols-2 tw-place-items-stretch"
    >
      <section className="tw-flex tw-flex-col tw-justify-between md:tw-px-[25px] xl:tw-px-[50px]">
        <MainHeader isMobile={false} />
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
        <span className="tw-absolute tw-bottom-10 tw-right-10 tw-text-[10px] tw-text-transparent">
          {appVersion}
        </span>
      </section>
    </div>
  );
};

export default DesktopLayout;
