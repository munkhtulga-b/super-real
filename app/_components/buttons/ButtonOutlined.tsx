type ButtonProps = {
  text: string;
};

const ButtonOutlined: React.FunctionComponent<ButtonProps> = ({ text }) => {
  return (
    <button className="tw-bg-white tw-rounded-[50px] tw-border-[1px] tw-border-secondary tw-px-4 tw-py-2 hover:tw-bg-primary hover:tw-border-transparent tw-transition-all tw-duration-300">
      <span className="tw-text-base tw-text-primary hover:tw-text-white tw-transition-colors tw-duration-300">
        {text}
      </span>
    </button>
  );
};

export default ButtonOutlined;
