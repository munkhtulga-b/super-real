"use client";

import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import ButtonPrimarySuffix from "./buttons/ButtonPrimarySuffix";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonType, OptionType } from "../_redux/stores/options-slice";

interface MobileOptionsProps {
  buttons: ButtonType[];
  activeButton: ButtonType | null;
  current: OptionType | null;
  handleButtonClick: (button: ButtonType) => void;
  handleOptionClick: (option: OptionType) => void;
  handleReturn: () => void;
}

const MainOptions: React.FunctionComponent<MobileOptionsProps> = ({
  buttons,
  activeButton,
  current,
  handleButtonClick,
  handleOptionClick,
  handleReturn,
}) => {
  const handleIconType = (option: OptionType) => {
    let result: "play" | "pause" | "completed" = "play";
    if (!option.isPlayed) {
      result =
        current?.id === option.id && current?.isPlaying ? "pause" : "play";
    } else {
      result = "completed";
    }
    return result;
  };

  const returnComponent = () => {
    return (
      <button
        onClick={handleReturn}
        className="tw-px-4 tw-flex tw-justify-start tw-items-center tw-gap-x-[18px]"
      >
        <Image
          src={"/assets/return-arrow.svg"}
          alt={"return"}
          width={0}
          height={0}
          style={{ width: "auto", height: "auto" }}
        />
        <span className="tw-text-base tw-text-grayDark">
          {activeButton?.buttonText}
        </span>
      </button>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <div className="tw-mt-5 tw-flex tw-flex-col">
        <motion.div
          key={activeButton ? "buttons" : "options"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {activeButton ? (
            // Your first component
            returnComponent()
          ) : (
            // Your second component
            <p
              key={"placeholder"}
              className="tw-text-base tw-text-grayDark tw-px-4 tw-h-[27px]"
            >
              何を聞きたいですか？
            </p>
          )}
          {/* Rest of your components */}
          <section className="scrollbar-container tw-snap-x tw-snap-start tw-px-4 tw-flex tw-justify-start tw-items-center tw-gap-x-4 tw-overflow-x-scroll tw-whitespace-nowrap tw-mt-[14px]">
            {!activeButton &&
              buttons.map((button) => (
                <ButtonPrimary
                  onClickEvent={() => handleButtonClick(button)}
                  key={button.buttonId}
                  text={button.buttonText}
                  button={button}
                />
              ))}
            {activeButton &&
              activeButton.buttonOptions.map((option, idx) => {
                return (
                  <ButtonPrimarySuffix
                    iconType={handleIconType(option)}
                    key={option.id}
                    text={option.text}
                    activeButton={activeButton}
                    option={option}
                    onClickEvent={() => handleOptionClick(option)}
                    current={current}
                  />
                );
              })}
          </section>
        </motion.div>
        <section className="tw-px-4 tw-mt-[25px] tw-mb-[45px]">
          <ButtonSecondary />
        </section>
      </div>
    </AnimatePresence>
  );
};

export default MainOptions;
