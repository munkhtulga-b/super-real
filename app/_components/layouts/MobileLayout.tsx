import MainHeader from "../MainHeader";
import MainVideoFrame from "../MainVideoFrame";
import MainOptions from "../MainOptions";

const MobileLayout = () => {
  return (
    <div className="tw-grid tw-grid-cols-1 tw-auto-rows-min">
      <MainHeader />
      <MainVideoFrame />
      <MainOptions message="質問があります？" />
    </div>
  );
};

export default MobileLayout;
