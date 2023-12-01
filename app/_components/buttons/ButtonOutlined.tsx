import { ButtonType } from "@/app/_redux/stores/options-slice";

type ButtonProps = {
  text: string;
  button: ButtonType;
  activeButton: ButtonType;
};

const ButtonOutlined: React.FunctionComponent<ButtonProps> = ({
  text,
  button,
  activeButton,
}) => {
  return (
    <button
      className={`${
        activeButton.buttonId === button.buttonId
          ? "tw-bg-primary tw-text-white tw-border-transparent"
          : "tw-bg-white tw-border-secondary tw-text-primary"
      } tw-rounded-[50px] tw-border-[1px]  tw-px-4 tw-py-2 hover:tw-bg-primary hover:tw-text-white hover:tw-border-transparent tw-transition-all tw-duration-300`}
    >
      <span className="tw-text-base tw-whitespace-nowrap">{text}</span>
    </button>
  );
};

export default ButtonOutlined;
