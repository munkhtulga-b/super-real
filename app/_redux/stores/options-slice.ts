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
  isVisible?: boolean;
};

export interface OptionsState {
  current: number | null;
  screenSize: number;
}

const initialState: OptionsState = {
  current: null,
  screenSize: 0,
};

export const optionsSlice = createSlice({
  name: "options",
  initialState: initialState,
  reducers: {
    updateCurrent(state, action: PayloadAction<{ id: number | null }>) {
      state.current = action.payload.id;
    },
    onVideoEnd(state) {
      state.current = null;
    },
    updateScreenSize(state, action: PayloadAction<number>) {
      state.screenSize = action.payload;
    },
  },
});

export const { updateCurrent, onVideoEnd, updateScreenSize } =
  optionsSlice.actions;

export default optionsSlice.reducer;
