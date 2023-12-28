import { useRef, useEffect, useState, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactHlsPlayer from "react-hls-player";
import { ButtonType, OptionType } from "../_redux/stores/options-slice";
import PuffLoader from "react-spinners/PuffLoader";
import Image from "next/image";
import { useAppSelector } from "../_redux/config";
import ButtonMailTo from "../_components/buttons/ButtonMailTo";

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
  const [muted, setMuted] = useState(true);
  const [canPlay, setCanPlay] = useState(false);
  const screenSize = useAppSelector((state) => state.store.screenSize);
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const idleVideoURL =
    "https://superreal.reddtech.ai/video/idles.json/master.m3u8";

  useEffect(() => {
    playVideo();
  }, [current, canPlay]);

  const playVideo = async () => {
    if (current?.url !== videoURL) {
      setMuted(true);
      setCanPlay(false);
    }
    if (current) {
      setVideoURL(current.url);
      if (!current.isPlaying) {
        playerRef.current?.pause();
      }
      if (videoURL !== null) {
        const unmuteButton: HTMLButtonElement =
          document.querySelector("#unmute-button")!;
        setTimeout(() => {
          unmuteButton.click();
        }, 100);
      }
    } else {
      setVideoURL(null);
      setMuted(true);
      setCanPlay(true);
    }
  };

  const onVideoLoaded = (e: any) => {
    if (videoURL && current?.isPlaying) {
      setCanPlay(true);
    } else {
      setCanPlay(false);
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
      <button
        id="mute-toggler"
        className="tw-absolute tw-top-4 tw-left-4 tw-z-30"
        onClick={() => setMuted(!muted)}
      >
        {muted && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="tw-w-6 tw-h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        )}
        {!muted && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="tw-w-6 tw-h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        )}
      </button>
      <button
        id="unmute-button"
        className="tw-absolute tw-top-4 tw-left-right tw-z-0 tw-opacity-0"
        onClick={() => setMuted(false)}
      ></button>

      <span
        style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
        className={`${screenSize < 390 || window.innerHeight < 844
          ? "tw-text-[12px]"
          : "md:tw-text-sm"
          } tw-absolute tw-top-[13.5px] tw-right-[32.5px] md:tw-top-[41px] md:tw-right-[86.5px] tw-z-30 tw-whitespace-nowrap tw-tracking-[2px] tw-text-grayDark/75`}
      >
        これは録画ではありません
        <br />
        代表の木又のAIモデルです
      </span>
      <div
        className="video-container tw-flex tw-justify-center tw-relative"
        style={{
          minHeight: frameSize(),
        }}
        key={videoURL}
      >
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
              window.innerHeight < 844 || screenSize < 390 ? "150px" : "200px",
            height:
              window.innerHeight < 844 || screenSize < 390 ? "150px" : "200px",
            position: "absolute",
            left: "50%",
            top: "50%",
            zIndex: "0",
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="tw-z-20"
          > */}
        <ReactHlsPlayer
          id="player"
          playerRef={playerRef}
          preload="auto"
          autoPlay={true}
          muted={muted}
          loop={!videoURL}
          src={videoURL === null ? idleVideoURL : videoURL}
          controls={false}
          webkit-playsinline="true"
          playsInline
          onCanPlay={onVideoLoaded}
          onEnded={onVideoEnd}
          style={{
            width: "auto",
            maxHeight: frameSize(),
            pointerEvents: "none",
            zIndex: "20",
            // aspectRatio: "0.75/1",
          }}
        // className={`${
        //   canPlay || !current ? "tw-opacity-100" : "tw-opacity-0"
        // } tw-transition-all tw-duration-1000`}
        />
        {/* </motion.div>
        </AnimatePresence> */}
      </div>
      <AnimatePresence>
        {current?.text === "その他" && canPlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="tw-absolute tw-bottom-6 md:tw-bottom-16 tw-left-1/2 tw-translate-x-[-50%] tw-z-30"
          >
            <ButtonMailTo />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainVideoFrame;
