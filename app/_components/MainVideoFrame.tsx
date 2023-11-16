import { useRef, useEffect } from "react";

const MainVideoFrame = () => {
  useEffect(() => {
    const videoElement = document.querySelector(
      "#video-tag"
    ) as HTMLVideoElement;
    setTimeout(() => {
      console.log(videoRef);
      console.log(videoElement.ended);
    }, 1000);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="tw-mt-[50px] tw-w-full">
      <div className="video-container tw-relative">
        <span
          style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
          className="tw-absolute tw-top-[13.5px] tw-right-[32.5px] md:tw-top-[41px] md:tw-right-[86.5px] tw-z-10 tw-text-base"
        >
          き ま た の A I モ デ ル で す
        </span>
        <video
          id="video-tag"
          ref={videoRef}
          style={{ zIndex: 0 }}
          height={"100%"}
          width={"100%"}
          autoPlay
          muted
        >
          <source src="/assets/demo-video-4.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default MainVideoFrame;
