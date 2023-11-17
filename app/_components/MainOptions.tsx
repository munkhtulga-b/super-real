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

  for (let i = 0; i < 10; i++) {
    buttons.push(<ButtonPrimary key={i} text={`予約と金額`} />);
  }

  return (
    <div className="tw-mt-5 tw-flex tw-flex-col">
      <p className="tw-text-base tw-text-grayDark tw-px-4">{message}</p>
      <section className="scrollbar-container tw-snap-x tw-snap-start tw-px-4 tw-flex tw-justify-start tw-items-center tw-gap-x-4 tw-overflow-x-scroll tw-whitespace-nowrap tw-mt-[14px]">
        {buttons}
      </section>
      <section className="tw-px-4 tw-mt-[25px] tw-mb-[45px]">
        <ButtonSecondary />
      </section>
    </div>
  );
};

export default MainOptions;
