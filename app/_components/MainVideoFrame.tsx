import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReactHlsPlayer from "react-hls-player";

const MainVideoFrame = () => {
  const playerRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className="tw-mt-[50px] tw-w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="video-container tw-relative tw-flex tw-justify-center"
      >
        <span
          style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
          className="tw-absolute tw-top-[13.5px] tw-right-[32.5px] md:tw-top-[41px] md:tw-right-[86.5px] tw-z-10 tw-text-base tw-whitespace-nowrap"
        >
          き ま た の A I モ デ ル で す
        </span>
        <ReactHlsPlayer
          playerRef={playerRef}
          autoPlay
          muted
          src="https://superreal.reddtech.ai/video/japan.json/master.m3u8"
        />
        ,
      </motion.div>
    </div>
  );
};

export default MainVideoFrame;
