const ButtonSecondary = () => {
  const email = "info@pluscare-sol.co.jp";
  const subject = "";
  const body = "";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <a href={mailtoLink} target="_blank" rel="noopener noreferrer">
      <button className="tw-bg-primary tw-rounded-[50px] tw-p-2 md:tw-p-4 tw-text-center tw-w-full">
        <span className="tw-text-white tw-text-[12px] md:tw-text-base">
          info@pluscare-sol.co.jp
        </span>
      </button>
    </a>
  );
};

export default ButtonSecondary;
