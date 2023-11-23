import { useState } from "react";
import dataJSON from "@/app/_resources/data.json";
import MainHeader from "../MainHeader";
import MainVideoFrame from "../MainVideoFrame";
import MainOptions from "../MainMobileOptions";
import { useDispatch } from "react-redux";
import {
  ButtonType,
  OptionType,
  updateCurrent,
} from "../../_redux/stores/options-slice";

const MobileLayout = () => {
  const [buttons, setButtons] = useState<ButtonType[]>(dataJSON);
  const [activeButton, setActiveButton] = useState<ButtonType | null>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const dispatch = useDispatch();

  const handleButtonClick = (button: ButtonType) => {
    setActiveButton(button);
  };

  const handleOptionClick = (option: OptionType) => {
    if (current && current === option.id) {
      setCurrent(null);
      dispatch(updateCurrent({ id: null }));
    } else {
      setCurrent(option.id);
      dispatch(updateCurrent({ id: option.id }));
    }
  };

  const handleReturn = () => {
    setActiveButton(null);
    setCurrent(null);
    dispatch(updateCurrent({ id: null }));
  };

  return (
    <div className="tw-grid tw-grid-cols-1 tw-auto-rows-min">
      <MainHeader />
      <MainVideoFrame activeButton={activeButton} current={current} />
      <MainOptions
        buttons={buttons}
        activeButton={activeButton}
        current={current}
        handleButtonClick={handleButtonClick}
        handleOptionClick={handleOptionClick}
        handleReturn={handleReturn}
      />
    </div>
  );
};

export default MobileLayout;
