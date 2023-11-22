import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import data from "@/app/_resources/data.json";

export type ButtonType = {
  buttonId: number;
  buttonText: string;
  buttonOptions: OptionType[];
  buttonSuggestions: OptionType[];
};

export type OptionType = {
  id: number;
  text: string;
  url: string;
  isPlaying: boolean;
  isPlayed: boolean;
};

export interface OptionsState {
  buttons: ButtonType[];
  activeButton: ButtonType | null;
  activeOption: OptionType | null;
}

const initialState: OptionsState = {
  buttons: data,
  activeButton: null,
  activeOption: null,
};

export const optionsSlice = createSlice({
  name: "options",
  initialState: initialState,
  reducers: {
    updateActiveButton(
      state,
      action: PayloadAction<{ button: ButtonType | null }>
    ) {
      state.activeButton = action.payload.button;
    },
    updateOption(
      state,
      action: PayloadAction<{ option: OptionType | null; idx?: number }>
    ) {
      const updatedOption = action.payload.option
        ? {
            ...action.payload.option,
            isPlaying:
              !state.activeButton!.buttonOptions[action.payload.idx!].isPlaying,
          }
        : null;
      const updatedArray = state.activeButton!.buttonOptions.map((option) => {
        if (option.id === updatedOption?.id) {
          return updatedOption!;
        }
        return option;
      });
      state.activeButton!.buttonOptions = updatedArray;
      state.activeOption = updatedOption;
    },
    onVideoEnd(state, action: PayloadAction<{ option: OptionType }>) {
      const idx = state.activeButton?.buttonOptions.findIndex((option) => {
        return option.id === action.payload.option.id;
      });
      if (idx !== undefined && idx !== -1) {
        state.activeButton!.buttonOptions[idx].isPlayed = true;
      }
    },
  },
});

export const { updateActiveButton, updateOption, onVideoEnd } =
  optionsSlice.actions;

export default optionsSlice.reducer;
