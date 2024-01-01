import { useState, useEffect } from "react";
import dataJSON from "@/app/_resources/data.json";
import MainHeader from "../MainHeader";
import MainVideoFrame from "../MainVideoFrame";
import MainOptions from "../MainMobileOptions";
import { ButtonType, OptionType } from "../../_redux/stores/options-slice";
import { deviceDetect } from "mobile-device-detect";

const MobileLayout = ({ appVersion }: { appVersion: string }) => {
  const device = deviceDetect();
  const [showToast, setShowToast] = useState(false);
  const toastVersionList = ["16.3", "16.4", "16.5", "16.6", "16.2"]
  const [buttons, setButtons] = useState<ButtonType[]>(dataJSON);
  const [activeButton, setActiveButton] = useState<ButtonType | null>(null);
  const [current, setCurrent] = useState<OptionType | null>(null);

  useEffect(() => {
    shouldShowToast()
  }, [])

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
      if (!prev) return null;
      return {
        ...prev,
        buttonOptions: prev?.buttonOptions?.map((item) => {
          if (item.id !== shallow.id) {
            return { ...item, isPlaying: false };
          }
          return shallow;
        }),
      };
    });
    setCurrent(shallow);
  };

  const handleReturn = () => {
    setActiveButton(null);
    setCurrent(null);
  };

  const shouldShowToast = () => {
    const osVersion = device.osVersion
    const isToastVersion = toastVersionList.find(item => item === osVersion)
    if (device.isMobile && device.os === "iOS" && isToastVersion) {
      setShowToast(true);
    }
  }

  const toast = () => {
    return (
      <div style={{
        backgroundColor: "#D3E7FF",

      }} className="tw-absolute tw-mt-10 tw-border-blueMedium tw-top-4 tw-right-4 tw-left-4 tw-p-2 tw-rounded-md tw-shadow tw-z-[999]">
        <p className="tw-text-[12px]">
          うまく動かない場合は最新のOSに
          <a href="https://support.apple.com/ja-jp/HT204204" target="_blank" style={{
            color: "#2B5BD3"
          }}>
            アップデート
          </a>してください
        </p>
      </div >
    )
  }

  return (
    <div className="tw-grid tw-grid-cols-1 tw-auto-rows-min">
      <MainHeader />
      {showToast && toast()}
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
