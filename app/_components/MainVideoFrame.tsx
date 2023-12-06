import { useRef, useEffect, useState, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactHlsPlayer from "react-hls-player";
import { ButtonType, OptionType } from "../_redux/stores/options-slice";
import PuffLoader from "react-spinners/PuffLoader";
import Image from "next/image";
import { useAppSelector } from "../_redux/config";

interface VideoFrameProps {
  activeButton: ButtonType | null;
  current: OptionType | null;
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
  const [canPlay, setCanPlay] = useState(false);
  const screenSize = useAppSelector((state) => state.store.screenSize);
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  useEffect(() => {
    const playVideo = async () => {
      if (current?.url !== videoURL) {
        setCanPlay(false);
      }
      if (current) {
        setVideoURL(current.url);
        if (current.isPlaying) {
          playerRef.current?.play();
        } else {
          playerRef.current?.pause();
        }
      } else {
        setVideoURL(null);
      }
    };
    playVideo();
  }, [current, activeButton?.buttonOptions, videoURL]);

  const handleAnimationDone = () => {
    if (!videoURL && !current) {
      playerRef.current?.play();
    }
    if (current?.isPlaying) {
      playerRef.current?.play();
    }
  };

  const onVideoLoaded = () => {
    if (videoURL && current?.isPlaying) {
      setCanPlay(true);
    }
  };

  const frameSize = () => {
    let result = "calc(100vh - 50vh)";
    if (screenSize > 1024) {
      result = "calc(100vh - 20vh)";
    }
    if (screenSize < 390 || window.innerHeight < 844) {
      result = "calc(100vh - 60vh)";
    }
    return result;
  };

  return (
    <div className="tw-mt-[50px] tw-w-full tw-relative">
      <span
        style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
        className={`${
          screenSize < 390 || window.innerHeight < 844
            ? "tw-text-[12px]"
            : "md:tw-text-base"
        } tw-absolute tw-top-[13.5px] tw-right-[32.5px] md:tw-top-[41px] md:tw-right-[86.5px] tw-z-30 tw-whitespace-nowrap tw-tracking-[-2px]`}
      >
        き ま た の A I モ デ ル で す
      </span>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onAnimationComplete={handleAnimationDone}
          className="video-container tw-flex tw-justify-center tw-relative"
          style={{
            minHeight: frameSize(),
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
            priority
            src={"/assets/blobanimation.svg"}
            width={0}
            height={0}
            alt="blob"
            style={{
              width:
                window.innerHeight < 844 || screenSize < 390
                  ? "150px"
                  : "200px",
              height:
                window.innerHeight < 844 || screenSize < 390
                  ? "150px"
                  : "200px",
              position: "absolute",
              left: "50%",
              top: "50%",
              zIndex: "0",
              transform: "translate(-50%, -50%)",
            }}
          />
          {!videoURL && (
            <ReactHlsPlayer
              playerRef={playerRef}
              preload="auto"
              autoPlay={false}
              muted
              loop
              src="https://superreal.reddtech.ai/video/idles.json/master.m3u8"
              controls={false}
              webkit-playsinline="true"
              playsInline
              onCanPlay={() => setCanPlay(false)}
              style={{
                width: "auto",
                maxHeight: frameSize(),
                pointerEvents: "none",
                zIndex: "20",
                // aspectRatio: "0.75/1",
              }}
              className={`${
                !videoURL ? "tw-opacity-100" : "tw-opacity-0"
              } tw-transition-all tw-duration-1000`}
            />
          )}
          {videoURL && (
            <ReactHlsPlayer
              playerRef={playerRef}
              autoPlay={false}
              muted={false}
              loop={false}
              src={videoURL}
              controls={false}
              webkit-playsinline="true"
              playsInline
              onEnded={onVideoEnd}
              onCanPlayThrough={onVideoLoaded}
              style={{
                width: "auto",
                maxHeight: frameSize(),
                pointerEvents: "none",
                zIndex: "20",
                // aspectRatio: "0.75/1",
              }}
              className={`${
                canPlay ? "tw-opacity-100" : "tw-opacity-0"
              } tw-transition-all tw-duration-1000`}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainVideoFrame;
