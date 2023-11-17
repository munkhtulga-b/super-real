import { useState } from "react";
import MainVideoFrame from "../MainVideoFrame";
import MainHeader from "../MainHeader";
import MainDesktopOptions from "../MainDesktopOptions";

const DesktopLayout = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="tw-grid tw-grid-cols-2 tw-place-items-stretch"
    >
      <section className="tw-flex tw-flex-col md:tw-px-[25px] xl:tw-px-[50px]">
        <MainHeader />
        <MainVideoFrame />
      </section>
      <section className="tw-grid tw-auto-rows-min tw-place-items-center md:tw-px-[50px] xl:tw-px-[157.5px]">
        <MainDesktopOptions />
      </section>
    </div>
  );
};

export default DesktopLayout;
