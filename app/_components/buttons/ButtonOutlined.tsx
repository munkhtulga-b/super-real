type ButtonProps = {
  text: string;
  buttonId: number;
  activeButtonId: number;
};

const ButtonOutlined: React.FunctionComponent<ButtonProps> = ({
  text,
  activeButtonId,
  buttonId,
}) => {
  return (
    <button
      className={`${
        activeButtonId == buttonId
          ? "tw-bg-primary tw-text-white tw-border-transparent"
          : "tw-bg-white tw-border-secondary tw-text-primary"
      } tw-rounded-[50px] tw-border-[1px]  tw-px-4 tw-py-2 tw-transition-all tw-duration-300`}
    >
      <span className="tw-text-base">{text}</span>
    </button>
  );
};

export default ButtonOutlined;
