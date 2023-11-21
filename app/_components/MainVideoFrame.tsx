import { useRef, useEffect } from "react";
import { useAppSelector } from "../_redux/config";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import ReactHlsPlayer from "react-hls-player";
import { updateVideoEnded } from "../_redux/stores/options-slice";

const MainVideoFrame = () => {
  const dispatch = useDispatch();
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const videoURL = useAppSelector((state) => state.store.videoUrl);

  const handleVideoEnd = () => {
    dispatch(updateVideoEnded({ isVideoEnded: true }));
  };

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
          className="tw-absolute tw-top-[13.5px] tw-right-[32.5px] md:tw-top-[41px] md:tw-right-[86.5px] tw-z-10 md:tw-text-base tw-whitespace-nowrap"
        >
          き ま た の A I モ デ ル で す
        </span>
        <ReactHlsPlayer
          playerRef={playerRef}
          autoPlay
          muted
          src={videoURL}
          onEnded={handleVideoEnd}
        />
      </motion.div>
    </div>
  );
};

export default MainVideoFrame;
