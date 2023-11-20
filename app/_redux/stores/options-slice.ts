import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OptionsState {
  activeButtonId: number;
  activeOptionId: number;
}

const initialState: OptionsState = {
  activeButtonId: 1,
  activeOptionId: 1,
};

export const optionsSlice = createSlice({
  name: "options",
  initialState: initialState,
  reducers: {
    changeActiveButtonId: (state, action: PayloadAction<number>) => {
      state.activeButtonId = action.payload;
    },
    changeActiveOptionId: (state, action: PayloadAction<number>) => {
      state.activeOptionId = action.payload;
    },
  },
});

export const { changeActiveButtonId, changeActiveOptionId } =
  optionsSlice.actions;

export default optionsSlice.reducer;
