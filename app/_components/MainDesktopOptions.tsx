"use client";

import { useState } from "react";
import ButtonOutlined from "./buttons/ButtonOutlined";
import ButtonPrimarySuffix from "./buttons/ButtonPrimarySuffix";
import ButtonSecondary from "./buttons/ButtonSecondary";
import { buttons, options, DataType } from "../_data/desktop";

const MainDesktopOptions = () => {
  const [activeButtonId, setActiveButtonId] = useState(buttons[0].id);
  const activeOptions =
    options[`button${activeButtonId}` as keyof DataType] || [];
  const handleButtonClick = (buttonId: number): void => {
    setActiveButtonId(buttonId);
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
                <li key={option.id}>
                  <ButtonPrimarySuffix text={option.text} iconType="play" />
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <div className="tw-mt-[46.5px] tw-pl-[123.5px] tw-pr-[66.5px]">
        <ButtonSecondary />
      </div>
    </div>
  );
};

export default MainDesktopOptions;
