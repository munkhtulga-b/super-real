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
}

const initialState: OptionsState = {
  buttons: data,
  activeButton: null,
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
  },
});

export const { updateActiveButton } = optionsSlice.actions;

export default optionsSlice.reducer;
