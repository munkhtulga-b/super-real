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
  videoUrl: string;
  isVideoEnded: boolean;
}

const initialState: OptionsState = {
  buttons: data,
  activeButton: null,
  videoUrl: "https://superreal.reddtech.ai/video/japan.json/master.m3u8",
  isVideoEnded: false,
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
    updateOptionIsPlaying(
      state,
      action: PayloadAction<{ option: OptionType }>
    ) {
      const idx = state.activeButton?.buttonOptions
        .map((option) => option.id)
        .indexOf(action.payload.option.id);
      if (idx !== undefined && idx !== -1) {
        state.activeButton!.buttonOptions[idx].isPlaying =
          !state.activeButton!.buttonOptions[idx].isPlaying;
      }
    },
    updateVideoEnded(state, action: PayloadAction<{ isVideoEnded: boolean }>) {
      state.isVideoEnded = action.payload.isVideoEnded;
    },
    updateVideoUrl(state, action: PayloadAction<{ videoUrl: string }>) {
      state.videoUrl = action.payload.videoUrl;
    },
  },
});

export const {
  updateActiveButton,
  updateVideoEnded,
  updateVideoUrl,
  updateOptionIsPlaying,
} = optionsSlice.actions;

export default optionsSlice.reducer;
