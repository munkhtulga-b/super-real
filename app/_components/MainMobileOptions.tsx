"use client";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../_redux/config";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import ButtonPrimarySuffix from "./buttons/ButtonPrimarySuffix";
import {
  ButtonType,
  OptionType,
  updateActiveButton,
  updateOption,
  updateOptionFromList,
} from "../_redux/stores/options-slice";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const MainOptions: React.FunctionComponent = () => {
  const buttons = useAppSelector((state) => state.store.buttons);
  const activeButton = useAppSelector((state) => state.store.activeButton);
  const activeOption = useAppSelector((state) => state.store.activeOption);

  const dispatch = useDispatch();

  const handleButtonClick = (button: ButtonType) => {
    dispatch(updateActiveButton({ button }));
  };

  const handleOptionClick = (option: OptionType) => {
    dispatch(updateOption({ option: option }));
    dispatch(updateOptionFromList({ option }));
  };

  const handleReturn = () => {
    console.log("return clicked");
    dispatch(updateActiveButton({ button: null }));
    dispatch(updateOption({ option: null }));
  };

  const handleIconType = (option: OptionType, activeOption: OptionType) => {
    let result: "play" | "pause" | "completed" = "play";
    if (!option.isPlayed) {
      result =
        option.id === activeOption?.id && activeOption?.isPlaying
          ? "pause"
          : "play";
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
        <span className="tw-text-base tw-text-grayDark">予約と金額</span>
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
              質問があります？
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
              activeButton.buttonOptions.map((option) => {
                return (
                  <ButtonPrimarySuffix
                    iconType={handleIconType(
                      option,
                      activeOption as OptionType
                    )}
                    key={option.id}
                    text={option.text}
                    option={option}
                    onClickEvent={() => handleOptionClick(option)}
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
