"use client";

import { useEffect, useState } from "react";
import MobileLayout from "./_components/layouts/MobileLayout";
import DesktopLayout from "./_components/layouts/DesktopLayout";

export default function Home() {
  useEffect(() => {
    setScreenSize(window.innerWidth);
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);

  const [screenSize, setScreenSize] = useState(0);

  return (
    <>
      {screenSize !== 0 && screenSize > 768 && <DesktopLayout />}
      {screenSize !== 0 && screenSize < 768 && <MobileLayout />}
    </>
  );
}
