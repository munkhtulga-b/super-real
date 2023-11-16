import ButtonOutlined from "./buttons/ButtonOutlined";
import ButtonPrimarySuffix from "./buttons/ButtonPrimarySuffix";
import ButtonSecondary from "./buttons/ButtonSecondary";

const MainDesktopOptions = () => {
  const buttons = [];
  const options = [];

  for (let i = 0; i < 4; i++) {
    buttons.push(<ButtonOutlined key={i} text={`予約と金額`} />);
  }

  for (let i = 0; i < 5; i++) {
    options.push(
      <ButtonPrimarySuffix key={i} text={`予約と金額`} iconType="play" />
    );
  }

  return (
    <div className="tw-w-fit tw-h-auto tw-flex tw-flex-col">
      <div className="tw-rounded-[24px] tw-shadow tw-py-[25px] tw-mt-[225px]">
        <section className="tw-px-[22px]">
          <ul className="tw-m-0 tw-flex tw-justify-start tw-items-center tw-w-full tw-gap-2">
            {buttons.map((button, idx) => {
              return <li key={idx}>{button}</li>;
            })}
          </ul>
        </section>
        <section className="tw-px-[42.5px] tw-mt-5">
          <ul className="tw-m-0 tw-grid tw-grid-cols-1 tw-auto-rows-min tw-gap-y-3">
            {options.map((option, idx) => {
              return <li key={idx}>{option}</li>;
            })}
          </ul>
        </section>
      </div>
      <div className="tw-mt-[46.5px] tw-pl-[123.5px] tw-pr-[66.5px]">
        <ButtonSecondary />
      </div>
    </div>
  );
};

export default MainDesktopOptions;
