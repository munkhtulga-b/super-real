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
    updateOptionFromList(state, action: PayloadAction<{ option: OptionType }>) {
      const idx = state.activeButton?.buttonOptions.findIndex((option) => {
        return option.id === action.payload.option.id;
      });
      if (idx !== undefined && idx !== -1) {
        state.activeButton!.buttonOptions[idx] = {
          ...action.payload.option,
          isPlaying: !action.payload.option.isPlaying,
        };
      }
    },
    updateOption(state, action: PayloadAction<{ option: OptionType | null }>) {
      const updated = action.payload.option
        ? {
            ...action.payload.option,
            isPlaying: !action.payload.option.isPlaying,
          }
        : null;
      state.activeOption = updated;
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

export const {
  updateActiveButton,
  updateOption,
  updateOptionFromList,
  onVideoEnd,
} = optionsSlice.actions;

export default optionsSlice.reducer;
