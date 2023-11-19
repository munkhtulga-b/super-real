import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export const testSlice = createSlice({
  name: 'counter',
  initialState: {value: "Hello"},
  reducers: {
    changeString: (state) => {
      state.value = "World!"
    },
  },
})

export const { changeString } = testSlice.actions

export default testSlice.reducer
