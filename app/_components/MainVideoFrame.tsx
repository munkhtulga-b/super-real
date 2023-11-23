import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import ReactHlsPlayer from "react-hls-player";
import { ButtonType, onVideoEnd } from "../_redux/stores/options-slice";

interface VideoFrameProps {
  activeButton: ButtonType | null;
  current: number | null;
}

const MainVideoFrame: React.FunctionComponent<VideoFrameProps> = ({
  activeButton,
  current,
}) => {
  const dispatch = useDispatch();
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const handleVideoEnd = () => {
    setVideoURL(null);
    dispatch(onVideoEnd());
  };

  useEffect(() => {
    if (current) {
      const currentOption = activeButton?.buttonOptions.find((item) => {
        return item.id === current;
      });
      if (currentOption) {
        setVideoURL(currentOption?.url);
        playerRef.current?.play();
      }
    } else {
      setVideoURL(null);
      playerRef.current?.pause();
    }
  }, [current]);

  return (
    <div className="tw-mt-[50px] tw-w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="video-container tw-relative tw-flex tw-justify-center"
        style={{ minHeight: "calc(100vh - 50vh)" }}
      >
        <span
          style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
          className="tw-absolute tw-top-[13.5px] tw-right-[32.5px] md:tw-top-[41px] md:tw-right-[86.5px] tw-z-10 md:tw-text-base tw-whitespace-nowrap"
        >
          き ま た の A I モ デ ル で す
        </span>
        <ReactHlsPlayer
          playerRef={playerRef}
          autoPlay
          muted
          loop={videoURL ? false : true}
          src={
            videoURL
              ? videoURL
              : "https://superreal.reddtech.ai/video/0_1.json/master.m3u8"
          }
          controls={false}
          webkit-playsinline
          playsInline
          onEnded={handleVideoEnd}
          style={{ width: "auto", maxHeight: "calc(100vh - 50vh)" }}
        />
      </motion.div>
    </div>
  );
};

export default MainVideoFrame;
