import Image from "next/image";

const MainHeader = () => {
  return (
    <div className="tw-mt-[39px] tw-px-[28px] md:tw-px-0 tw-py-2 tw-flex tw-justify-center md:tw-justify-start tw-items-center tw-gap-x-4">
      <button className="tw-w-[30px] tw-h-[30px] tw-grid tw-place-items-center">
        <Image
          src="/assets/return-button.svg"
          alt="return"
          width={17.5}
          height={15}
        />
      </button>
      <p className="tw-m-0 tw-text-center md:tw-text-lg">
        キマタ先生がプラスケアの商品に ついて説明いたします。
      </p>
    </div>
  );
};

export default MainHeader;
