import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactHlsPlayer from "react-hls-player";
import { ButtonType, onVideoEnd } from "../_redux/stores/options-slice";

interface VideoFrameProps {
  activeButton: ButtonType | null;
  current: number | null;
  onVideoEnd: () => void;
}

const MainVideoFrame: React.FunctionComponent<VideoFrameProps> = ({
  activeButton,
  current,
  onVideoEnd,
}) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      playerRef.current?.play();
    }, 200);
  }, []);

  useEffect(() => {
    if (current) {
      const currentOption = activeButton?.buttonOptions.find((item) => {
        return item.id === current;
      });
      if (currentOption) {
        setVideoURL(currentOption?.url);
        setTimeout(() => {
          if (!playerRef.current) return;
          playerRef.current?.play();
        }, 500);
      }
    } else {
      setVideoURL(null);
    }
  }, [current, activeButton?.buttonOptions]);

  return (
    <div className="tw-mt-[50px] tw-w-full tw-relative">
      <span
        style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
        className="tw-absolute tw-top-[13.5px] tw-right-[32.5px] md:tw-top-[41px] md:tw-right-[86.5px] tw-z-10 md:tw-text-base tw-whitespace-nowrap tw-tracking-[-2px]"
      >
        き ま た の A I モ デ ル で す
      </span>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="video-container tw-flex tw-justify-center tw-relative"
          style={{ minHeight: "calc(100vh - 50vh)" }}
          key={videoURL}
        >
          <motion.div
            transition={{ duration: 0.4 }}
            key={videoURL}
            initial={{ scale: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            animate={{ scale: 1, backgroundColor: "rgba(255, 255, 255, 0)" }}
            exit={{ scale: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            className="tw-absolute tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-rounded-full"
          />
          <ReactHlsPlayer
            playerRef={playerRef}
            autoPlay={!videoURL}
            muted={!videoURL}
            loop={!videoURL}
            src={
              videoURL
                ? videoURL
                : "https://superreal.reddtech.ai/video/idle.json/master.m3u8"
            }
            controls={false}
            webkit-playsinline="true"
            playsInline
            onEnded={onVideoEnd}
            style={{
              width: "auto",
              maxHeight: "calc(100vh - 50vh)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainVideoFrame;
