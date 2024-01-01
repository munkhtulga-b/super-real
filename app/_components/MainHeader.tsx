import Image from "next/image";

const MainHeader = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className={`
    ${isMobile ? 'tw-mt-[10px]' : 'tw-mt-[39px]'} tw-px-2 md:tw-px-0 tw-py-1 tw-flex tw-justify-center md:tw-justify-start tw-gap-x-2 md:tw-gap-x-4
    `}>
      <button className="tw-w-[30px] tw-h-[30px] tw-grid tw-place-items-center">
        <a href="https://pluscare-sol.co.jp/exosome">
          <Image
            src="/assets/return-button.svg"
            alt="return"
            width={17.5}
            height={15}
          />
        </a>
      </button>
      <p className="tw-m-0 tw-text-center md:tw-text-lg">
        プラスケア代表の木又がご説明いたします
      </p>
    </div>
  );
};

export default MainHeader;
