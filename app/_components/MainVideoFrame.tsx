const MainVideoFrame = () => {
  return (
    <div className="tw-mt-[50px] tw-w-full tw-max-h-[449px] tw-overflow-hidden">
      <div className="video-container">
        <video height={449} autoPlay muted>
          <source src="/assets/1.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default MainVideoFrame;
