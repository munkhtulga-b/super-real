"use client";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../_redux/config";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import ButtonPrimarySuffix from "./buttons/ButtonPrimarySuffix";
import { ButtonType, updateActiveButton } from "../_redux/stores/options-slice";
import Image from "next/image";

const MainOptions: React.FunctionComponent = () => {
  const buttons = useAppSelector((state) => state.store.buttons);
  const activeButton = useAppSelector((state) => state.store.activeButton);

  const dispatch = useDispatch();

  const handleButtonClick = (button: ButtonType) => {
    dispatch(updateActiveButton({ button }));
  };

  const returnComponent = () => {
    return (
      <button
        onClick={() => dispatch(updateActiveButton({ button: null }))}
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
    <div className="tw-mt-5 tw-flex tw-flex-col">
      {activeButton ? (
        returnComponent()
      ) : (
        <p className="tw-text-base tw-text-grayDark tw-px-4">
          質問があります？
        </p>
      )}

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
                iconType="play"
                key={option.id}
                text={option.text}
              />
            );
          })}
      </section>
      <section className="tw-px-4 tw-mt-[25px] tw-mb-[45px]">
        <ButtonSecondary />
      </section>
    </div>
  );
};

export default MainOptions;
