import { useRef, useEffect, useState, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactHlsPlayer from "react-hls-player";
import ReactPlayer from "react-player";
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
  const [videoKey, setVideoKey] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const screenSize = useAppSelector((state) => state.store.screenSize);
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  useEffect(() => {
    const playVideo = async () => {
      console.log(current);
      if (current?.url !== videoURL) {
        setCanPlay(false);
      }
      if (current) {
        setVideoURL(current.url);
        if (!current.isPlaying) {
          playerRef.current?.pause();
        }
      } else {
        setVideoURL(null);
      }
    };
    playVideo();
  }, [current]);

  useEffect(() => {
    if (canPlay) {
      setTimeout(() => {
        const player: HTMLVideoElement = document.querySelector("#player")!;
        player.muted = false;
      }, 1000);
    }
  }, [canPlay]);

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
      <span
        style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
        className={`${
          screenSize < 390 || window.innerHeight < 844
            ? "tw-text-[12px]"
            : "md:tw-text-sm"
        } tw-absolute tw-top-[13.5px] tw-right-[32.5px] md:tw-top-[41px] md:tw-right-[86.5px] tw-z-30 tw-whitespace-nowrap tw-tracking-[5px] tw-text-grayDark/75`}
      >
        これは録画ではありません。
        <br />
        代表の木又のAIモデルです。
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
        <ReactHlsPlayer
          id="player"
          playerRef={playerRef}
          preload="auto"
          autoPlay={true}
          muted={true}
          loop={!videoURL}
          src={
            !videoURL
              ? "https://superreal.reddtech.ai/video/idles.json/master.m3u8"
              : videoURL
          }
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
        />
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="tw-absolute tw-bottom-6 md:tw-bottom-16 tw-left-1/2 tw-translate-x-[-50%] tw-z-30"
        >
          {current?.text === "その他" && canPlay && <ButtonMailTo />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainVideoFrame;
