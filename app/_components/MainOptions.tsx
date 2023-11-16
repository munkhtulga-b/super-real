"use client";

import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import React, { useState } from "react";

type MainOptionsProps = {
  message: string;
};

const MainOptions: React.FunctionComponent<MainOptionsProps> = ({
  message,
}) => {
  const buttons: React.ReactElement[] = [];
  const [touchStartX, setTouchStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  for (let i = 0; i < 10; i++) {
    buttons.push(<ButtonPrimary key={i} text={`予約と金額`} />);
  }

  /**
   * Handles the touch start event.
   *
   * @param {React.TouchEvent<HTMLDivElement>} e - The touch event.
   * @return {void}
   */
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchStartX(e.touches[0].clientX);
  };

  /**
   * Handles the touch end event.
   *
   * @return {void}
   */
  const handleTouchEnd = (): void => {
    const scrollTrack: HTMLDivElement | null = document.querySelector(
      ".scrollbar-container"
    );

    if (!scrollTrack) return;

    setScrollLeft(scrollTrack.scrollLeft);
  };

  /**
   * Handles the drag event.
   *
   * @param {React.MouseEvent<HTMLDivElement>} e - The touch event.
   */
  const handleDrag = (e: React.TouchEvent<HTMLDivElement>): void => {
    const scrollTrack: HTMLDivElement = document.querySelector(
      ".scrollbar-container"
    )!;
    const x = e.touches[0].clientX;
    const walk = (x - touchStartX) * 2;

    scrollTrack.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="tw-mt-5 tw-flex tw-flex-col">
      <p className="tw-text-base tw-text-grayDark tw-px-4">{message}</p>
      <section
        onTouchMove={handleDrag}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="scrollbar-container tw-px-4 tw-flex tw-justify-start tw-items-center tw-gap-x-4 tw-overflow-x-scroll tw-whitespace-nowrap tw-mt-[14px]"
      >
        {buttons}
      </section>
      <section className="tw-px-4 tw-mt-[25px] tw-mb-[45px]">
        <ButtonSecondary />
      </section>
    </div>
  );
};

export default MainOptions;
