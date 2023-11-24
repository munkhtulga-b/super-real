import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    }, 100);
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
        }, 10);
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
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 1 }}
        className="video-container tw-flex tw-justify-center"
        style={{ minHeight: "calc(100vh - 50vh)" }}
        key={videoURL}
      >
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
    </div>
  );
};

export default MainVideoFrame;
