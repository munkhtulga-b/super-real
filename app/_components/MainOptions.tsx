"use client";

import ButtonPrimary from "./buttons/ButtonPrimary";
import React, { useState } from "react";

type MainOptionsProps = {
  message: string;
};

const MainOptions: React.FunctionComponent<MainOptionsProps> = ({
  message,
}) => {
  const buttons: React.ReactElement[] = [];
  const [isDragging, setIsDragging] = useState(false);

  for (let i = 0; i < 10; i++) {
    buttons.push(<ButtonPrimary key={i} text={`予約と金額`} />);
  }

  /**
   * Handles the drag event.
   *
   * @param {React.MouseEvent<HTMLDivElement>} e - The drag event.
   */
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    const scrollTrack: HTMLDivElement = document.querySelector(
      ".scrollbar-container"
    )!;
    scrollTrack.scrollLeft -= e.movementX;
  };

  return (
    <div className="tw-mt-5 tw-flex tw-flex-col tw-gap-y-[14px]">
      <span>{isDragging ? "dragging" : "not dragging"}</span>
      <p className="tw-text-base tw-text-grayDark tw-px-4">{message}</p>
      <section
        onMouseMove={handleDrag}
        onMouseDown={() => setIsDragging(true)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseUp={() => setIsDragging(false)}
        className="scrollbar-container tw-px-4 tw-flex tw-justify-start tw-items-center tw-gap-x-4 tw-overflow-x-hidden tw-whitespace-nowrap"
      >
        {buttons}
      </section>
    </div>
  );
};

export default MainOptions;
