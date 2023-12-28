"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "./_redux/config";
import MobileLayout from "./_components/layouts/MobileLayout";
import DesktopLayout from "./_components/layouts/DesktopLayout";
import { updateScreenSize } from "./_redux/stores/options-slice";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setScreenSize(window.innerWidth);
    dispatch(updateScreenSize(window.innerWidth));
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
      dispatch(updateScreenSize(window.innerWidth));
    });
  }, [dispatch]);

  const appVersion = "v.1.0.12";

  const [screenSize, setScreenSize] = useState(0);

  return (
    <>
      {screenSize !== 0 && screenSize > 768 && (
        <DesktopLayout appVersion={appVersion} />
      )}
      {screenSize !== 0 && screenSize < 768 && (
        <MobileLayout appVersion={appVersion} />
      )}
    </>
  );
}
