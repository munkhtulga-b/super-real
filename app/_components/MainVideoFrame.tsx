import { useRef, useEffect, useState, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactHlsPlayer from "react-hls-player";
import { ButtonType, onVideoEnd } from "../_redux/stores/options-slice";
import PuffLoader from "react-spinners/PuffLoader";
import Image from "next/image";
import { useAppSelector } from "../_redux/config";

interface VideoFrameProps {
  activeButton: ButtonType | null;
  current: number | null;
  onVideoEnd: () => void;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  left: "50%",
  top: "50%",
  zIndex: "10",
  transform: "translate(-50%, -50%)",
};

const MainVideoFrame: React.FunctionComponent<VideoFrameProps> = ({
  activeButton,
  current,
  onVideoEnd,
}) => {
  const screenSize = useAppSelector((state) => state.store.screenSize);
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
        className="tw-absolute tw-top-[13.5px] tw-right-[32.5px] md:tw-top-[41px] md:tw-right-[86.5px] tw-z-30 md:tw-text-base tw-whitespace-nowrap tw-tracking-[-2px]"
      >
        き ま た の A I モ デ ル で す
      </span>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="video-container tw-flex tw-justify-center tw-relative"
          style={{
            minHeight:
              screenSize > 1024 ? "calc(100vh - 20vh)" : "calc(100vh - 50vh)",
          }}
          key={videoURL}
        >
          {/* <motion.div
            transition={{ duration: 0.4 }}
            key={videoURL}
            initial={{ scale: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            animate={{ scale: 1, backgroundColor: "rgba(255, 255, 255, 0)" }}
            exit={{ scale: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            className="tw-absolute tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-rounded-full"
          /> */}
          <PuffLoader
            size={60}
            color="#FFFFFF"
            loading={true}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <Image
            src={"/assets/blobanimation.svg"}
            width={0}
            height={0}
            alt="blob"
            style={{
              width: "200px",
              height: "200px",
              position: "absolute",
              left: "50%",
              top: "50%",
              zIndex: "0",
              transform: "translate(-50%, -50%)",
            }}
          />
          <ReactHlsPlayer
            playerRef={playerRef}
            autoPlay={!videoURL}
            muted={!videoURL}
            loop={!videoURL}
            src={
              videoURL
                ? videoURL
                : "https://superreal.reddtech.ai/video/testi.json/master.m3u8"
            }
            controls={false}
            webkit-playsinline="true"
            playsInline
            onEnded={onVideoEnd}
            style={{
              width: "auto",
              maxHeight:
                screenSize > 1024 ? "calc(100vh - 20vh)" : "calc(100vh - 50vh)",
              pointerEvents: "none",
              zIndex: "20",
              // aspectRatio: "0.75/1",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainVideoFrame;
