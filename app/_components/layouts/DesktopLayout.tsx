import MainVideoFrame from "../MainVideoFrame";
import MainHeader from "../MainHeader";
import MainDesktopOptions from "../MainDesktopOptions";

const DesktopLayout = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="tw-grid tw-grid-cols-2 tw-place-items-stretch"
    >
      <section className="tw-flex tw-flex-col tw-px-[63px]">
        <MainHeader />
        <MainVideoFrame />
      </section>
      <section className="tw-grid tw-auto-rows-min">
        <MainDesktopOptions />
      </section>
    </div>
  );
};

export default DesktopLayout;
